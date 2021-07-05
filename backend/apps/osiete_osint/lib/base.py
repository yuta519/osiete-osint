from ipaddress import AddressValueError, IPv4Address
import logging
import re
import time
from urllib.parse import urlparse

from apps.osiete_osint.models import (OsintList, Service, UrlScan, VtSummary)

logger = logging.getLogger(__name__)


class AbstractBaseClient():
    """ """
    def __init__(self):
        self.headers = {'user-agent': 'osiete/1.0'}
        self.url_pattern = 'https?://[\w/:%#\$&\?\(\)~\.=\+\-]+'

    def has_analyzed(self, osint) -> tuple:
        not_yet, already_analyzed = 0, 1
        is_osint_in_db = OsintList.objects.filter(data_id=osint)
        has_analyzed = already_analyzed if is_osint_in_db else not_yet
        return has_analyzed, is_osint_in_db
    
    def judge_osint_type(self, target) -> int:
        IP, DOMAIN, HASH = 1, 2, 3
        # Check whether target osint is ipaddress or not
        try:
            IPv4Address(target)
            osint_type = IP
        except AddressValueError:
            # Check whether target osint is URL or not
            osint_type = DOMAIN 
            # if re.match(self.url_pattern, target) else HASH
        return osint_type

    def extract_url_domain(self, target_url) -> str:
        """Extract domain from url given by user."""
        if re.match(self.url_pattern, target_url):
            parsed_url = urlparse(target_url)
            domain = parsed_url.netloc
            return domain
        else:
            return target_url

    def assess_osint_risk(self, osint) -> dict:
        has_analyzed, osint_res = self.has_analyzed(osint)
        if has_analyzed == 1:
            return osint_res.values('data_id','analyzing_type','malicious_level')
        else:
            res = self.fetch_vt_risk(osint)
            OsintList.objects.create(data_id=osint, analyzing_type=res['type'], 
                                    malicious_level=res['malicious_level'])
            return res

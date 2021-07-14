from shodan import Shodan
import os


class ShodanClient(object):

    def __init__(self) -> None:
        # super().__init__()
        self.api = Shodan(os.environ.get('SH_API'))


    def test(self):
        # Lookup an IP
        ipinfo = self.api.host('8.8.8.8')
        print(ipinfo)

        # Search for websites that have been "hacked"
        for banner in self.api.search_cursor('http.title:"hacked by"'):
            print(banner)

        # Get the total number of industrial control systems services on the Internet
        ics_services = self.api.count('tag:ics')
        print('Industrial Control Systems: {}'.format(ics_services['total']))


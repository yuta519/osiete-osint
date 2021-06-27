# Generated by Django 3.2.4 on 2021-06-26 04:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('osiete_osint', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='OsintList',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data_id', models.CharField(max_length=100, unique=True)),
                ('analyzing_type', models.IntegerField(choices=[(0, 'INVALID'), (1, 'IPADDRESS'), (2, 'DOMAIN'), (3, 'FILEHASH')], null=True)),
                ('last_analyzed', models.DateTimeField(auto_now=True)),
                ('malicious_level', models.IntegerField(choices=[(0, 'UNKNOWN'), (1, 'MALICIOUS'), (2, 'SUSPICIOUS'), (3, 'SAFE')], null=True)),
            ],
            options={
                'verbose_name': 'OSINT Data',
                'verbose_name_plural': 'OSINT Data List',
                'ordering': ('data_id',),
            },
        ),
        migrations.CreateModel(
            name='VtSummary',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('owner', models.CharField(max_length=100, null=True)),
                ('gui_url', models.URLField(null=True, unique=True)),
                ('malicious_level', models.IntegerField(choices=[(0, 'UNKNOWN'), (1, 'MALICIOUS'), (2, 'SUSPICIOUS'), (3, 'SAFE')], null=True)),
                ('malicious_possibility', models.IntegerField(choices=[(0, 'UNKNOWN'), (1, 'MALICIOUS'), (2, 'SUSPICIOUS'), (3, 'SAFE')], null=True)),
                ('indexed_at', models.DateTimeField(auto_now_add=True)),
                ('osint_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='osiete_osint.osintlist')),
            ],
            options={
                'verbose_name': 'OSINT Data',
                'verbose_name_plural': 'VirusTotal Summary',
                'ordering': ('osint_id',),
            },
        ),
        migrations.CreateModel(
            name='VtComments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.CharField(max_length=100, null=True)),
                ('comment', models.CharField(max_length=1000, null=True)),
                ('vt_summary', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='osiete_osint.vtsummary')),
            ],
            options={
                'verbose_name': 'OSINT',
                'verbose_name_plural': 'VirusTotal Comments',
                'ordering': ('vt_summary',),
            },
        ),
        migrations.CreateModel(
            name='UrlScan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('domain', models.CharField(max_length=100, unique=True)),
                ('primary_ip', models.CharField(max_length=20, null=True)),
                ('server', models.CharField(max_length=20, null=True)),
                ('asnname', models.CharField(max_length=20, null=True)),
                ('asn', models.CharField(max_length=20, null=True)),
                ('ptr', models.CharField(max_length=100, null=True)),
                ('screenshot', models.URLField(null=True)),
                ('osint_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='osiete_osint.osintlist')),
            ],
            options={
                'verbose_name': 'OSINT',
                'verbose_name_plural': 'urlscan.io information',
                'ordering': ('osint_id',),
            },
        ),
        migrations.CreateModel(
            name='OsintSearchHistory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField()),
                ('from_ip', models.CharField(max_length=16, verbose_name='from ipaddr')),
                ('osint_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='osiete_osint.osintlist')),
            ],
            options={
                'verbose_name': 'OSINT',
                'verbose_name_plural': 'OSINT Search History',
                'ordering': ('osint_id',),
            },
        ),
    ]
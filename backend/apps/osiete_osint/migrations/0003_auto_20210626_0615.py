# Generated by Django 3.2.4 on 2021-06-26 06:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('osiete_osint', '0002_osintlist_osintsearchhistory_urlscan_vtcomments_vtsummary'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='osintlist',
            options={'ordering': ('osint_id',), 'verbose_name': 'OSINT', 'verbose_name_plural': 'OSINT List'},
        ),
        migrations.AlterModelOptions(
            name='vtsummary',
            options={'ordering': ('osint_id',), 'verbose_name': 'OSINT', 'verbose_name_plural': 'VirusTotal Summary'},
        ),
        migrations.RenameField(
            model_name='osintlist',
            old_name='data_id',
            new_name='osint_id',
        ),
        migrations.RenameField(
            model_name='osintlist',
            old_name='analyzing_type',
            new_name='osint_type',
        ),
    ]

# Generated by Django 2.1 on 2018-09-11 23:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('django_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='portfolio_picture',
            field=models.ImageField(blank=True, default='media/images/defaultuser.png', upload_to='media/images/'),
        ),
    ]
# Generated by Django 4.2.4 on 2023-10-06 04:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_userprofile_delete_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='Auditoria',
            fields=[
                ('id', models.BigIntegerField(primary_key=True, serialize=False)),
                ('tabla', models.CharField(blank=True, max_length=100, null=True)),
                ('operacion', models.CharField(blank=True, max_length=10, null=True)),
                ('registroid', models.FloatField(blank=True, null=True)),
                ('fecha', models.DateField(blank=True, null=True)),
            ],
            options={
                'db_table': 'auditoria',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Categorias',
            fields=[
                ('id', models.BigIntegerField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(blank=True, max_length=100, null=True)),
            ],
            options={
                'db_table': 'categorias',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Clientes',
            fields=[
                ('id', models.BigIntegerField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(blank=True, max_length=100, null=True)),
                ('email', models.CharField(blank=True, max_length=100, null=True)),
                ('telefono', models.CharField(blank=True, max_length=20, null=True)),
            ],
            options={
                'db_table': 'clientes',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Compras',
            fields=[
                ('id', models.BigIntegerField(primary_key=True, serialize=False)),
                ('fechacompra', models.DateField(blank=True, null=True)),
                ('totalcompra', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
            ],
            options={
                'db_table': 'compras',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Detallescompra',
            fields=[
                ('id', models.BigIntegerField(primary_key=True, serialize=False)),
                ('cantidad', models.FloatField(blank=True, null=True)),
                ('preciounitario', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('subtotal', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
            ],
            options={
                'db_table': 'detallescompra',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Detallesventa',
            fields=[
                ('id', models.BigIntegerField(primary_key=True, serialize=False)),
                ('cantidad', models.FloatField(blank=True, null=True)),
                ('preciounitario', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('subtotal', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
            ],
            options={
                'db_table': 'detallesventa',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Movimientoinventario',
            fields=[
                ('id', models.BigIntegerField(primary_key=True, serialize=False)),
                ('cantidad', models.FloatField(blank=True, null=True)),
                ('tipomovimiento', models.CharField(blank=True, max_length=1, null=True)),
                ('fechamovimiento', models.DateField(blank=True, null=True)),
            ],
            options={
                'db_table': 'movimientoinventario',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Productos',
            fields=[
                ('id', models.BigIntegerField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(blank=True, max_length=100, null=True)),
                ('precio', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('stockinicial', models.FloatField(blank=True, null=True)),
                ('stockactual', models.FloatField(blank=True, null=True)),
            ],
            options={
                'db_table': 'productos',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Proveedores',
            fields=[
                ('id', models.BigIntegerField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(blank=True, max_length=100, null=True)),
                ('contacto', models.CharField(blank=True, max_length=100, null=True)),
                ('telefono', models.CharField(blank=True, max_length=20, null=True)),
            ],
            options={
                'db_table': 'proveedores',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Ventas',
            fields=[
                ('id', models.BigIntegerField(primary_key=True, serialize=False)),
                ('fechaventa', models.DateField(blank=True, null=True)),
                ('totalventa', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
            ],
            options={
                'db_table': 'ventas',
                'managed': False,
            },
        ),
    ]

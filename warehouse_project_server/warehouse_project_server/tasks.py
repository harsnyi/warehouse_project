# your_app/cron.py

from django_cron import CronJobBase, Schedule
from warehouse_project.models import Storage
from datetime import date
from dateutil.relativedelta import relativedelta

class UpdateDebt(CronJobBase):
    RUN_AT_TIMES = ['00:00']

    schedule = Schedule(run_at_times=RUN_AT_TIMES)
    code = 'warehouse_project_server.update_debt'

    def do(self):
        for storage in Storage.objects.all():
            if storage.occupier is not None:
                
                print(storage.occupier.refreshed)
                testing_date = date.today() + relativedelta(months=+6)
                print(testing_date)
                delta_month = relativedelta(testing_date,storage.occupier.refreshed).months
                if delta_month > 0:
                    storage.occupier.debt += delta_month * storage.cost
                    storage.occupier.refreshed += relativedelta(months=+delta_month)
                    storage.occupier.save()
                print(delta_month)
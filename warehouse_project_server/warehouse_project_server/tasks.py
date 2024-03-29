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
                delta_month = relativedelta(date.today(),storage.occupier.refreshed).months
                if delta_month > 0:
                    storage.occupier.debt += delta_month * storage.cost
                    storage.occupier.refreshed += relativedelta(months=+delta_month)
                    storage.occupier.save()
                
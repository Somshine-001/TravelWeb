import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditDataService, Plan } from '../../Service/editData.service';

@Component({
  selector: 'app-trip-modal',
  templateUrl: './trip-modal.component.html'
})
export class TripModalComponent {

  plans: Plan[] = [];

  @Input() tripData!: any
  @Output() close = new EventEmitter<void>()

  constructor(
    private editDataService: EditDataService
  ) { }

  ngOnInit(): void {
    this.editDataService.getAll<Plan>('plan').subscribe((plans) => {
      this.plans = this.groupPlans(plans.filter(plan => plan.tripId === this.tripData.id));
    })
  }
  onClose(): void {
    this.close.emit()
  }

  private groupPlans(plans: Plan[]): Plan[] {
    const groupedPlans = new Map<number, Plan>();

    plans.forEach(plan => {
        if (!groupedPlans.has(plan.id)) {
            groupedPlans.set(plan.id, {
                ...plan,
                planDetail: []
            });
        }

        const existingPlan = groupedPlans.get(plan.id);
        if (existingPlan) {
            if (Array.isArray(plan.planDetail) && Array.isArray(plan.planDetail)) {
                existingPlan.planDetail.push(...plan.planDetail);
            }
        }
    });

    return Array.from(groupedPlans.values());
  }

}

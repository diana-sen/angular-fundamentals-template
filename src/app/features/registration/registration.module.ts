import { NgModule } from "@angular/core";
import { RegistrationComponent } from "./registration.component";
import { SharedModule } from "@app/shared/shared.module";
import { RegistrationRoutingModule } from "./registration.routing";
import { CommonModule } from "@angular/common";

@NgModule({
    imports:[SharedModule, RegistrationRoutingModule],
    declarations:[RegistrationComponent],
    bootstrap:[RegistrationComponent],
    exports:[RegistrationComponent],
})
export class RegistrationModule {}
import { NgModule } from "@angular/core";
import { LoginComponent } from "./login.component";
import { SharedModule } from "@app/shared/shared.module";
import { LoginRoutingModule } from "./login.routing";
import { CommonModule } from "@angular/common";

@NgModule({
    imports:[CommonModule, SharedModule, LoginRoutingModule],
    declarations:[LoginComponent],
    bootstrap:[LoginComponent],
    exports:[LoginComponent],
})
export class LoginModule {}
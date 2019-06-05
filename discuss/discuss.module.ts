import { NgModule } from '@angular/core';
import { DiscussService } from './services/discuss.service';
import { EbsCoreModule } from '@enbiso/core/core.module';

@NgModule({
    imports: [
        EbsCoreModule
    ],
    providers: [DiscussService]
})
export class EbsDiscussModule { }

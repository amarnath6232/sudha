import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { TableListResolverService } from 'app/table-list/table-list-resolver.service';
import { MiniktComponent } from 'app/minikt/minikt.component';
import { ListMinikitComponent } from 'app/list-minikit/list-minikit.component';
import { ListMinikitResolverService } from 'app/list-minikit/list-minikit-resolver.service';


export const AdminLayoutRoutes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'table-list', component: TableListComponent, resolve: { userData: TableListResolverService } },
    { path: 'minikit', component: MiniktComponent },
    { path: 'list-minikit', component: ListMinikitComponent, resolve: { minikit: ListMinikitResolverService } },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'upgrade', component: UpgradeComponent },
];

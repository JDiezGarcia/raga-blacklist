import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./contacts/contacts.module').then((m) => m.ContactsModule),
    },
    {
        path: 'games',
        loadChildren: () =>
            import('./logs/logs.module').then((m) => m.LogsModule),
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules,
            relativeLinkResolution: 'legacy'
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule { }

import { Injectable } from '@angular/core';
import tenants from '../../../assets/tenants.json';

@Injectable({ providedIn: 'root' })
export class TenantService {

  getTenant() {
    const host = window.location.hostname;

    if (host.includes('tenant1')) return (tenants as any)['tenant1'];
    if (host.includes('tenant2')) return (tenants as any)['tenant2'];

    return (tenants as any)['tenant1']; // default
  }
}

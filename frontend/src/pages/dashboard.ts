import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

// Import semua komponen domain
import '../domains/hidroponik/dashboard-hidoponik.ts';
import '../domains/aquakultur/dashboard-aquakultur.ts';
import '../domains/peternakan/dashboard-peternakan.ts';
// page-dashboard.ts
import '../components/device-dialog.ts'; // registrasi <device-dialog>

@customElement('page-dashboard')
export class PageDashboard extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <section class="space-y-6">
        <dashboard-hidroponik></dashboard-hidroponik>
        <dashboard-aquakultur></dashboard-aquakultur>
        <dashboard-peternakan></dashboard-peternakan>
      </section>
    `;
  }
}

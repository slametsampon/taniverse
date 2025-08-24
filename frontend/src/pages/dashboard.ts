import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

// Import semua komponen domain
import '../views/domains/dashboard-hidoponik.js';
import '../views/domains/dashboard-aquakultur.js';
import '../views/domains/dashboard-peternakan.js';
import '../components/mode-selector.js';
// page-dashboard.ts
import '../components/device-dialog.ts'; // registrasi <device-dialog>

@customElement('page-dashboard')
export class PageDashboard extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    const cardStyle = 'display:block;margin-bottom:1.5rem;'; // jarak 24px antar komponen

    return html`
      <mode-selector></mode-selector>
      <section>
        <dashboard-hidroponik style=${cardStyle}></dashboard-hidroponik>
        <dashboard-aquakultur style=${cardStyle}></dashboard-aquakultur>
        <dashboard-peternakan style=${cardStyle}></dashboard-peternakan>
      </section>
    `;
  }
}

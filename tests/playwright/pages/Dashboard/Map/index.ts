import { DashboardPage } from '..';
import BasePage from '../../Base';
import { ToolbarPage } from '../common/Toolbar';

export class MapPage extends BasePage {
  readonly dashboard: DashboardPage;
  readonly toolbar: ToolbarPage;

  constructor(dashboard: DashboardPage) {
    super(dashboard.rootPage);
    this.dashboard = dashboard;
    this.toolbar = new ToolbarPage(this);
  }

  get() {
    return this.dashboard.get().locator('[data-testid="nc-map-wrapper"]');
  }

  async openExpandedRow({ index }: { index: number }) {
    await this.card(index).click();
    await (await this.rootPage.locator('.ant-drawer-body').elementHandle())?.waitForElementState('stable');
  }

  // todo: Wait for render to complete
  async waitLoading() {
    await this.rootPage.waitForTimeout(1000);
  }
}

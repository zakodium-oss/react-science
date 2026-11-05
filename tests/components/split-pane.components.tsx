import { SplitPane } from '../../src/components/index.js';

export function SplitPaneWithFrame() {
  return (
    <div style={{ height: 400, width: 600 }}>
      <SplitPane>
        <div>Start</div>
        <iframe
          title="Frame"
          srcDoc="<p>Frame</p>"
          sandbox=""
          style={{ flex: 1, border: 0 }}
        />
      </SplitPane>
    </div>
  );
}

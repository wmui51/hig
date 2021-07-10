import TreeView, { TreeItem } from "@hig/tree-view";
import Surface from "@hig/surface";
import { Report24, ProductsAndServices24 } from "@hig/icons";

import './App.css';

function App() {
  return (
    <div className="App">
      <div style={{ width: "300px" }}>
        <Surface borderRadius="m" shadow="low">
          <TreeView gridlines alternateBg>
            <TreeItem
              id="tree-item-18"
              key="tree-item-18"
              label="Tree Item 18"
              icon={<Report24 />}
            >
              <TreeItem
                label="Tree Item 19"
                id="tree-item-19"
                key="tree-item-19"
                icon={<ProductsAndServices24 />}
              />
            </TreeItem>
          </TreeView>
        </Surface>
      </div>
    </div>
  );
}

export default App;

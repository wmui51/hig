import React, { Component } from "react";
import { NestedSubTreeItem } from "./NestedSubTreeItem";
import stylesheet from "../presenters/stylesheet";

class TreeObjectRender extends Component {
  render() {
    const {
      treeItem,
      treeItem: {
        id,
        payload,
        payload: { getActiveTreeItemId, getKeyboardOpenId, setKeyboardOpenId },
        meta: { collapsed },
        defaultCollapsed,
      },
      density,
      themeData,
      onClick,
      getIsCollapsed,
      setIsCollapsed,
      ...otherProps
    } = this.props;

    const {
      onFocus,
      onMouseDown,
      onMouseEnter,
      onMouseLeave,
      onMouseUp,
    } = otherProps;
    return (
      <NestedSubTreeItem
        density={density}
        treeItem={treeItem}
        themeData={themeData}
        onClick={onClick}
        onFocus={onFocus}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        selected={getActiveTreeItemId() === id}
        stylesheet={stylesheet}
        collapsed={getIsCollapsed()}
        getIsCollapsed={getIsCollapsed}
        getKeyboardOpenId={getKeyboardOpenId}
        keyboardOpenId={getKeyboardOpenId()}
        setIsCollapsed={setIsCollapsed}
        setKeyboardOpenId={setKeyboardOpenId}
      />
    );
  }
}

export default TreeObjectRender;

import React, { Component } from "react";
import PropTypes from "prop-types";
import { css, cx } from "emotion";
import { ThemeContext } from "@hig/theme-context";

import TreeObjectView from "../FileView/TreeObjectView";

import stylesheet from "./stylesheet";

const objectArray = [];

export default class TreeViewPresenterObject extends Component {
  static propTypes = {
    alternateBg: PropTypes.bool,
    children: PropTypes.node,
    getActiveTreeItemIndex: PropTypes.func,
    guidelines: PropTypes.bool,
    indicator: PropTypes.string,
    selected: PropTypes.bool,
    setTreeViewRef: PropTypes.func,
    stylesheet: PropTypes.func,
  };

  componentDidMount() {
    this.getTreeItemArray(this.props.treeNode);
    this.props.setTreeItemArray(objectArray);
  }

  componentDidUpdate() {
    const domNodeList = this.props.treeViewRef.querySelectorAll("li");

    const treeItemArrayControl =
      this.props.getTreeItemArray().length !== domNodeList.length
        ? this.buildTreeItemIdArray(Array.prototype.slice.call(domNodeList))
        : this.props.getTreeItemArray();

    if (this.props.getTreeItemArray().length !== domNodeList.length) {
      this.props.setTreeItemArray(treeItemArrayControl);
    }
  }

  getTreeItemArray(collection) {
    objectArray.push(collection.id);

    if (collection.children) {
      collection.children.map((child) => {
        this.getTreeItemArray(child);
      });
    }
  }

  buildTreeItemIdArray(list) {
    const ids = [];

    list.map((item) => {
      ids.push(Number(item.id));
    });

    return ids;
  }

  getTreeObject(collection) {
    let fileTree = {};
    const mapTreeObject = collection.reduce((acc, el, i) => {
      acc[el.id] = i;
      return acc;
    }, {});

    collection.forEach(function(el) {
      if (el.parentId === null) {
        fileTree = el;
        return;
      }
      const parentEl = collection[mapTreeObject[el.parentId]];
      parentEl.children = [...(parentEl.children || []), el];
    });

    return fileTree;
  }

  renderFileTree(tree, payload) {
    const appendPayload = {
      ...tree,
      payload,
    };
    return (
      <TreeObjectView
        tree={appendPayload}
        keyboardOpenId={payload.getKeyboardOpenId()}
      />
    );
  }

  render() {
    const {
      alternateBg,
      children,
      guidelines,
      setTreeViewRef,
      stylesheet: customStylesheet,
      treeNode,
      getKeyboardOpenId,
      getTreeItemArray,
      setActiveTreeItemId,
      setActiveTreeItemIndex,
      setKeyboardOpenId,
      indicator,
      getActiveTreeItemId,
      getActiveTreeItemIndex,
      setTreeItemArray,
      treeViewRef,
      ...otherProps
    } = this.props;

    return (
      <ThemeContext.Consumer>
        {({ resolvedRoles }) => {
          const {
            getActiveTreeItemId,
            getActiveTreeItemIndex,
            guidelines,
            indicator,
            onClick,
          } = this.props;
          const styles = stylesheet(
            {
              alternateBg,
              guidelines,
              stylesheet: customStylesheet,
            },
            resolvedRoles
          );

          return (
            <div className={css(styles.higTreeViewWrapper)}>
              <ul
                {...otherProps}
                className={css(styles.higTreeView)}
                ref={setTreeViewRef}
                role="tree"
                tabIndex="0"
              >
                {this.renderFileTree(treeNode, {
                  getActiveTreeItemId,
                  getActiveTreeItemIndex,
                  guidelines,
                  indicator,
                  stylesheet,
                  onClick,
                  getKeyboardOpenId,
                  getTreeItemArray,
                  setActiveTreeItemId,
                  setActiveTreeItemIndex,
                  setKeyboardOpenId,
                  setTreeItemArray,
                  ...otherProps,
                })}
              </ul>
            </div>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

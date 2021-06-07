import React, { Children, Component } from "react";
import PropTypes from "prop-types";
import { css, cx } from "emotion";
import { ThemeContext } from "@hig/theme-context";
import {
  CaretRightMUI,
  CaretRightSUI,
  OperatorMinusSUI,
  OperatorMinusXsUI,
  OperatorPlusSUI,
  OperatorPlusXsUI
} from "@hig/icons";
// import { createCustomClassNames } from "@hig/utils";
import TreeItem from "../TreeItem";
// import createChildren from "../behaviors/createChildren";
import stylesheet from "./stylesheet";
import { AVAILABLE_ROLES } from "../constants";

function SubTreeItem(props) {
  const { id, label, themeData } = props;
  const styles = stylesheet(props, themeData);

  return (
    <li
      className={css(styles.higTreeItem)}
      id={id}
      role="treeitem"
    >
      <div className={css(styles.higTreeItemContentWrapper)}>
        {label}
      </div>
    </li>
  );
}

function NestedSubTreeItem(props) {
  const {
    children,
    getActiveTreeItemId,
    getActiveTreeItemIndex,
    id,
    indicator,
    label,
    themeData
  } = props;
  const styles = stylesheet(props, themeData);
  const clonedChildren = React.cloneElement(children, { getActiveTreeItemId, getActiveTreeItemIndex, indicator });
  const IconIndicator = indicator === 'operator' ? OperatorPlusSUI : CaretRightMUI;

  return (
    <li
      aria-expanded="true"
      className={css(styles.higTreeItem)}
      id={id}
      role="treeitem"
    >
      <span><IconIndicator /> {label}</span>
      <div>
        <ul role="group">
          {clonedChildren}
        </ul>
      </div>
    </li>
  );
}

function NestedSubTreeItemGroup(props) {
  const {
    children,
    getActiveTreeItemId,
    getActiveTreeItemIndex,
    id,
    indicator,
    label,
    themeData
  } = props;
  const styles = stylesheet(props, themeData);
  const clonedChildren = React.Children.map(children, (child => React.cloneElement(child, {getActiveTreeItemId, getActiveTreeItemIndex, indicator})));
  const IconIndicator = indicator === 'operator' ? OperatorPlusSUI : CaretRightMUI;

  return (
    <li
      aria-expanded="true"
      className={css(styles.higTreeItem)}
      id={id}
      role="treeitem"
    >
      <span><IconIndicator /> {label}</span>
      <div>
        <ul role="group">
          {clonedChildren.map((child, index) => {
            // if it has a label then the children array should be of TreeItems
            if (child.props
              && child.props.children
              && Array.isArray(child.props.children)
            ) {
              return <NestedSubTreeItemGroup {...child.props} themeData={themeData} />
              // return this.buildNestedTreeItemArrays(child.props, themeData, index);
            }
            if (child.props && child.props.children && child.props.children.type === TreeItem) {
              return <NestedSubTreeItem {...child.props} themeData={themeData} />
              // return this.buildNestedTreeItem(child.props, themeData, index);
            } else {
              return <SubTreeItem {...child.props} themeData={themeData} />
              // return this.buildTreeItem(child.props, themeData, index);
            }
          })}
        </ul>
      </div>
    </li>
  );
}

export default class TreeItemPresenter extends Component {
  static propTypes = {
    children: PropTypes.node,
    /**
     * This only appears as a label when a TreeItem is the
     * child of another TreeItem. If your TreeItem has any
     * other elements as children this prop will not render
     */
    label: PropTypes.string,
    stylesheet: PropTypes.func
  };

  renderTreeItem() {
    const { children } = this.props;
// should we gate from improper use allow for user error
// check to see if children is array and check for TreeItems within
    return (
      <ThemeContext.Consumer>
        {({ resolvedRoles, metadata }) => {
          // if it has a label then the children array should be of TreeItems
          if (Array.isArray(children)) {
            return <NestedSubTreeItemGroup {...this.props} themeData={resolvedRoles} />
            // return this.buildNestedTreeItemArrays(this.props, resolvedRoles);
          }
          if (children && children.type === TreeItem) {
            // return this.buildNestedTreeItem(this.props, resolvedRoles);
            return <NestedSubTreeItem {...this.props} themeData={resolvedRoles} />
          } else {
            // return this.buildTreeItem(this.props, resolvedRoles);
            return <SubTreeItem {...this.props} themeData={resolvedRoles} />
          }
        }}
      </ThemeContext.Consumer>
    );
  }

  render() {
    const {
      children,
      indicator,
      isPressed,
      stylesheet: customStylesheet,
      ...otherProps
    } = this.props;
    const {
      role,
    } = otherProps;
    const treeA11y = {
      tabIndex: `-1`,
      role: role || `treeitem`
    }
    console.log('tree item presenter');
    console.log(this.props);
    return this.renderTreeItem();
  }
}
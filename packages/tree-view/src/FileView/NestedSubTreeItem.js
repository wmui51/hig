import React, { Component } from "react";

import PropTypes from "prop-types";
import { css, cx } from "emotion";

import SubTreeViewObjectPresenter from "./SubTreeViewObjectPresenter";
import IconIndicatorPresenter from "../presenters/IconIndicatorPresenter";

import {
  CaretDownMUI,
  CaretDownSUI,
  OperatorMinusSUI,
  OperatorMinusXsUI,
  OperatorPlusSUI,
  OperatorPlusXsUI,
} from "@hig/icons";

import stylesheet from "../presenters/stylesheet";

export function SubTreeItem(props) {
  const {
    treeItem,
    treeItem: {
      children,
      id,
      meta: { label, icon },
      payload: {
        indicator,
        getActiveTreeItemId,
        getActiveTreeItemIndex,
        guidelines,
      },
    },
    themeData,
    onClick,
  } = props;

  const styleTreeItem = {
    children,
    id,
    label,
    indicator,
    themeData,
    getActiveTreeItemId,
    getActiveTreeItemIndex,
    guidelines,
    selected: getActiveTreeItemId() === id,
  };
  const styles = stylesheet(styleTreeItem, themeData);
  return (
    <li
      className={css(styles.higTreeItemSubTreeItem)}
      id={id}
      role="treeitem"
      onClick={(event) => onClick(event, treeItem)}
    >
      <div className={css(styles.higTreeItemContentWrapper)}>
        {icon}
        {label}
      </div>
    </li>
  );
}

export function NestedSubTreeItem(props) {
  const {
    treeItem,
    treeItem: {
      children,
      id,
      meta: { label, icon, collapsed },
      payload,
      payload: {
        indicator,
        getActiveTreeItemId,
        getActiveTreeItemIndex,
        guidelines,
      },
    },
    density,
    themeData,
    onClick,
  } = props;

  const styleTreeItem = {
    children,
    id,
    label,
    indicator,
    themeData,
    getActiveTreeItemId,
    getActiveTreeItemIndex,
    guidelines,
    selected: getActiveTreeItemId() === id,
  };

  const styles = stylesheet(styleTreeItem, themeData);
  const OperatorMinusIcon =
    density === "medium-density" ? OperatorMinusSUI : OperatorMinusXsUI;
  const CaretDownIcon =
    density === "medium-density" ? CaretDownMUI : CaretDownSUI;
  const IconIndicator =
    indicator === "operator" ? OperatorMinusIcon : CaretDownIcon;
  return (
    <li
      aria-expanded={!collapsed}
      className={css(styles.higTreeItem)}
      id={id}
      role="treeitem"
    >
      <div className={css(styles.higTreeItemSubTreeViewLabelWrapper)}>
        <div
          className={css(styles.higTreeItemSubTreeViewLabelContentWrapper)}
          onClick={(event) => onClick(event, treeItem)}
        >
          <IconIndicatorPresenter
            collapsed={collapsed}
            density={density}
            indicator={indicator}
          />
          {icon}
          <span>{label}</span>
        </div>
      </div>
      <SubTreeViewObjectPresenter {...props} />
    </li>
  );
}

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
        getTreeItemArray,
        setKeyboardOpenId,
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
      onKeyDown={(event) => {
        console.log("event.keyCode", event.keyCode);
        if (event.keyCode === 13 || event.keyCode === 32) {
          treeItem.meta.collapsed = !treeItem.meta.collapsed;
        }
        if (event.keyCode === 38 || event.keyCode === 40) {
          setKeyboardOpenId(getActiveTreeItemId());
        }
      }}
      tabIndex={-1}
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
        getTreeItemArray,
        setKeyboardOpenId,
      },
    },
    density,
    themeData,
    onClick,
  } = props;

  if (getActiveTreeItemId() === id) {
    console.log(
      "getTreeItemArray",
      getTreeItemArray().indexOf(getActiveTreeItemIndex())
    );
  }

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
          onKeyDown={(event) => {
            if (event.keyCode === 13 || event.keyCode === 32) {
              treeItem.meta.collapsed = !treeItem.meta.collapsed;
            }
            if (event.keyCode === 38 || event.keyCode === 40) {
              setKeyboardOpenId(getActiveTreeItemId());
            }
          }}
          tabIndex={-1}
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

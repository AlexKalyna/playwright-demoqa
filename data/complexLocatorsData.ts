export const COMPLEX_LOCATORS_DATA = {
  CSS_SELECTORS: {
    DESCENDANT: 'div.rt-tbody .rt-tr',
    CHILD: 'div.rt-thead .rt-tr',
    ADJACENT_SIBLING: 'div[role="tab"]:first-child + div[role="tab"]',
    GENERAL_SIBLING: 'div[role="tab"]:first-child ~ div[role="tab"]',
    ATTRIBUTE_CONTAINS: 'input[placeholder*="Search"]',
    ATTRIBUTE_ENDS_WITH: 'button[id$="addNewRecordButton"]',
    NTH_CHILD: 'div.rt-tbody .rt-tr:nth-child(3)',
    NOT_EMPTY: 'div.rt-tbody .rt-tr:not(:empty)',
    FIRST_CHILD: 'div.rt-tbody .rt-tr:first-child .rt-td',
    ATTRIBUTE_MULTIPLE: 'div[role="tab"][aria-selected="true"]'
  },
  
  XPATH_SELECTORS: {
    DESCENDANT_AXIS: '//div[@class="rt-tbody"]//div[@class="rt-td"]',
    CHILD_AXIS: '//div[@class="rt-tbody"]/div[@class="rt-tr"]',
    FOLLOWING_SIBLING: '//div[@role="tab"][1]/following-sibling::div[@role="tab"]',
    PRECEDING_SIBLING: '//div[@role="tab"][last()]/preceding-sibling::div[@role="tab"]',
    ANCESTOR_AXIS: '//div[@class="rt-td"][1]/ancestor::div[@class="rt-tbody"]',
    PARENT_AXIS: '//div[@class="rt-td"][1]/parent::div[@class="rt-tr"]',
    CONTAINS_FUNCTION: '//input[contains(@placeholder, "Search")]',
    STARTS_WITH_FUNCTION: '//button[starts-with(@id, "addNewRecord")]',
    POSITION_FUNCTION: '//div[@class="rt-tr"][position()=1]',
    LAST_FUNCTION: '//div[@class="rt-tr"][position()=last()]',
    AND_OPERATOR: '//div[@role="tab" and @aria-selected="true"]',
    OR_OPERATOR: '//div[@role="tab" and (@aria-selected="true" or @aria-disabled="true")]',
    NOT_OPERATOR: '//div[@role="tab" and not(@aria-selected="true")]',
    TEXT_FUNCTION: '//div[@role="tab"][text()="What"]',
    CONTAINS_TEXT: '//button[contains(text(), "Add")]',
    MULTIPLE_CONDITIONS: '//input[contains(@placeholder, "Search") and @type="text"]',
    POSITION_ATTRIBUTE: '//div[@role="tab"][position()<=3 and not(@aria-disabled="true")]',
    COMPLEX_LOGICAL: '//div[@role="tab" and (@aria-selected="true" or position()=1)]',
    ANCESTOR_DESCENDANT: '//input[contains(@placeholder, "Search")]/ancestor::div[contains(@class, "rt-table")]//div[@class="rt-tbody"]'
  },
  
  EXPECTED_VALUES: {
    TABLE_ROWS_COUNT: 10,
    TABLE_CELLS_PER_ROW: 7,
    TOTAL_TABLE_CELLS: 70,
    TABS_AFTER_FIRST: 3,
    TABS_BEFORE_LAST: 3,
    NON_SELECTED_TABS: 3,
    ACTIVE_OR_DISABLED_TABS: 2,
    NON_DISABLED_TABS: 3,
    ACTIVE_OR_FIRST_TAB: 1,
    FIRST_TAB_TEXT: 'What',
    SECOND_TAB_TEXT: 'Origin',
    ADD_BUTTON_TEXT: 'Add'
  },
  
  PAGE_SECTIONS: {
    ELEMENTS: 'Elements',
    WEB_TABLES: 'Web Tables',
    WIDGETS: 'Widgets',
    TABS: 'Tabs'
  },
  
  ATTRIBUTES: {
    ROLE_TAB: 'tab',
    ARIA_SELECTED: 'aria-selected',
    ARIA_DISABLED: 'aria-disabled',
    CLASS_RT_TABLE: 'rt-table',
    CLASS_RT_TBODY: 'rt-tbody',
    CLASS_RT_TR: 'rt-tr',
    CLASS_RT_TD: 'rt-td',
    CLASS_RT_THEAD: 'rt-thead',
    CLASS_RT_TH: 'rt-th'
  }
}; 
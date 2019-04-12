import Vue from 'vue'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Button,
  Collapse,
  CollapseItem,
  Card,
  Tabs,
  TabPane,
  Header,
  Main,
  Footer,
  Container,
  Input,
  Checkbox,
  Radio,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Form,
  FormItem
} from 'element-ui'

Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Card)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Container)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Radio)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Form)
Vue.use(FormItem)

Vue.component(CollapseTransition.name, CollapseTransition)

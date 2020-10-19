import Vue from 'vue'
import {
  RadioButton,
  Switch,
  Button,
  Dialog,
  Tabs,
  TabPane,
  Table,
  TableColumn,
  RadioGroup,
  Card,
  Input,
  Form,
  FormItem,
  Link,
  Loading,
  Message
} from 'element-ui'
import '../element-variables.scss'

Vue.component(RadioGroup.name, RadioGroup)
Vue.component(RadioButton.name, RadioButton)
Vue.component(Switch.name, Switch)
Vue.component(Button.name, Button)
Vue.component(Dialog.name, Dialog)
Vue.component(Tabs.name, Tabs)
Vue.component(TabPane.name, TabPane)
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Card.name, Card)
Vue.component(Input.name, Input)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Link.name, Link)

Vue.use(Loading.directive)

Vue.prototype.$message = Message

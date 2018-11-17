import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const addGoods = r => require.ensure([], () => r(require('@/page/addGoods')), 'addGoods');

const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/addGoods',
		component: addGoods,
		meta:'添加商品',
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})

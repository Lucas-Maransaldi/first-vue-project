
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import Tarefas from "../views/Tarefas.vue"
import Projetos from "../views/Projetos.vue"
import FormularioDeprojetosVue from "@/views/projects/FormularioDeProjetos.vue";
import ListaDeProjetos from "@/views/projects/Lista.vue"

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tarefas',
        component: Tarefas
    },
    {
        path: '/projetos',
        component: Projetos,
        children: [
            {
                path: '',
                name: 'Projetos',
                component: ListaDeProjetos,
            },
            {
                path: 'novo',
                name: 'Novo projeto',
                component: FormularioDeprojetosVue
            },
            {
                path: ':id',
                name: 'Editar Projeto',
                component: FormularioDeprojetosVue,
                props: true
            },
        ]
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;

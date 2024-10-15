const app = Vue.createApp({
    data() {
        return {
            estados: [],
            cidades: [],
            estadoSelecionado: '',
            cidadeSelecionada: '',
            referencia: '',
            ceps: []
        };
    },
    mounted() {
        this.buscarEstados();
    },
    methods: {
        async buscarEstados() {
            const resposta = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
            this.estados = await resposta.json();
        },
        async buscarCidades() {
            if (this.estadoSelecionado) {
                const resposta = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${this.estadoSelecionado}/municipios`);
                this.cidades = await resposta.json();
                this.cidadeSelecionada = '';
            }
        },
        async buscarCEPs() {
            if (this.estadoSelecionado && this.cidadeSelecionada && this.referencia) {
                const resposta = await fetch(`https://viacep.com.br/ws/${this.estadoSelecionado}/${this.cidadeSelecionada}/${this.referencia}/json/`);
                this.ceps = await resposta.json();
            }
        }
    }
});

// Montando o aplicativo Vue no elemento HTML com o id 'app'
app.mount('#app');

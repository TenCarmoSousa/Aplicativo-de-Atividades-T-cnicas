// --- BANCO DE DADOS DE DOCUMENTOS ---
// (Idêntico a antes, não precisa copiar esta parte)
const documentosDB = {
    'evento': `
        <h4>Documentação Necessária:</h4>
        <ul>
            <li><strong>Planta Simplificada (deve conter):</strong>
                <ul>
                    <li>Área com cotas de todos os perímetros e larguras das saídas (em escala padronizada).</li>
                    <li>Lotação da edificação e áreas de risco.</li>
                    <li>Indicação de todas as dependências, áreas de risco, arquibancadas, arenas, palcos, centrais de gases, etc.</li>
                    <li>Símbolos gráficos dos sistemas de segurança contra incêndio (conforme NT 04).</li>
                    <li>Quadro de área e legenda das medidas contra incêndio.</li>
                    <li>Nota obrigatória com os dizeres: <em>"A responsabilidade pelo controle de acesso ao recinto e da lotação, bem como em manter as saídas desimpedidas e desobstruídas, e demais exigências constantes da NT 12, é do responsável pela organização do evento."</em></li>
                </ul>
            </li>
            <li><strong>Documentos Essenciais:</strong>
                <ul>
                    <li>Comprovante de Responsabilidade Técnica (ART/RRT) da <strong>instalação</strong> das medidas de segurança contra incêndio.</li>
                    <li>Atestado de Brigada de Incêndio.</li>
                </ul>
            </li>
            <li><strong>Documentos Adicionais (Apresentar *se houver* o respectivo item no local):</strong>
                <ul>
                    <li>ART/RRT de instalação/manutenção do material de acabamento e revestimento (se não for de classe 1).</li>
                    <li>ART/RRT da lona de cobertura (para lotação superior a 100 pessoas, conforme NT 10).</li>
                    <li>ART/RRT de instalação e estabilidade de arquibancadas e arenas desmontáveis.</li>
                    <li>ART/RRT de instalação dos brinquedos de parques de diversão.</li>
                    <li>ART/RRT de instalação e estabilidade dos palcos.</li>
                    <li>ART/RRT de instalação e estabilidade das armações de circos.</li>
                    <li>ART/RRT de instalações elétricas.</li>
                    <li>ART/RRT do grupo motogerador.</li>
                    <li>ART/RRT de outras montagens mecânicas ou eletroeletrônicas.</li>
                </ul>
            </li>
        </ul>
    `,
    'processo-tecnico': `
        <h4>Documentação Necessária:</h4>
        <p>A documentação é dividida em duas fases:</p>
        <ul>
            <li><strong>Para Emissão do CAP (Certificado de Aprovação de Projeto):</strong>
                <ul>
                    <li>Formulário de Segurança Contra Incêndio de Processo Técnico (Anexo B da parte 2 da NT 01).</li>
                    <li>Levantamento arquitetônico (para edificações construídas) <strong>OU</strong> Projeto arquitetônico (para edificações a construir), conforme Anexo D da NT 01.</li>
                    <li>Projeto de Prevenção Contra Incêndio e Emergências (memorial descritivo e pranchas).</li>
                    <li>Comprovação de Responsabilidade Técnica (ART/RRT) pela <strong>elaboração</strong> dos projetos.</li>
                    <li>Comprovante de pagamento da Taxa de Análise.</li>
                    <li><strong>Se aplicável (Ocupações I, J, K, L, M):</strong> Apresentar documentos adicionais conforme item 7.3.3. da NT 01 parte 01.</li>
                    <li><strong>Se aplicável (com GLP):</strong> Apresentar projeto da central de GLP (memorial, ART/RRT, etc.).</li>
                    <li><strong>Se aplicável (Elétrica/SPDA):</strong> Atestado de conformidade das instalações elétricas e SPDA (Anexo E da parte 2 da NT 01).</li>
                </ul>
            </li>
            <li><strong>Para Emissão do CA (Certificado de Aprovação - Vistoria, 1ª certificação):</strong>
                <ul>
                    <li>Atestado de conformidade das instalações elétricas e SPDA (Anexo E da parte 2 da NT 01).</li>
                    <li>Atestado de Brigada de Incêndio (se exigido).</li>
                    <li>Laudo de <strong>execução</strong> das medidas de segurança (com ART/RRT), descrevendo todos os itens atendidos conforme projeto aprovado.</li>
                    <li>Relatórios de inspeção/manutenção das medidas (conforme Normas Técnicas específicas).</li>
                    <li>Comprovante de pagamento da Taxa.</li>
                </ul>
            </li>
        </ul>
    `,
    'simplificado-baixo': `
        <h4>Documentação Necessária:</h4>
        <ul>
            <li>Preencher a Declaração de Baixo Risco (Anexo B da NT 42).</li>
            <li>Isento de taxa.</li>
        </ul>
    `,
    'simplificado-medio': `
        <h4>Documentação Necessária:</h4>
        <ul>
            <li>Laudo de Processo Técnico Simplificado (PTS) com anexos (fotos, notas fiscais, etc.).</li>
            <li>Comprovação de Responsabilidade Técnica (ART/RRT) pela <strong>execução</strong> das medidas de segurança.</li>
            <li>Comprovante de pagamento de Taxa.</li>
        </ul>
    `
};

// Aguarda o documento carregar antes de rodar o script
document.addEventListener("DOMContentLoaded", function() {

    // --- LÓGICA DAS ABAS (ATUALIZADA PARA 3 ABAS) ---
    const btnAbaAnalisador = document.getElementById('btn-aba-analisador');
    const btnAbaCalculadora = document.getElementById('btn-aba-calculadora');
    const btnAbaInfo = document.getElementById('btn-aba-info'); // NOVO

    const abaAnalisador = document.getElementById('aba-analisador');
    const abaCalculadora = document.getElementById('aba-calculadora');
    const abaInfo = document.getElementById('aba-info'); // NOVO

    btnAbaAnalisador.addEventListener('click', function() {
        // Ativa o botão
        btnAbaAnalisador.classList.add('active');
        btnAbaCalculadora.classList.remove('active');
        btnAbaInfo.classList.remove('active'); // NOVO
        // Mostra o conteúdo
        abaAnalisador.classList.add('active');
        abaCalculadora.classList.remove('active');
        abaInfo.classList.remove('active'); // NOVO
    });

    btnAbaCalculadora.addEventListener('click', function() {
        // Ativa o botão
        btnAbaAnalisador.classList.remove('active');
        btnAbaCalculadora.classList.add('active');
        btnAbaInfo.classList.remove('active'); // NOVO
        // Mostra o conteúdo
        abaAnalisador.classList.remove('active');
        abaCalculadora.classList.add('active');
        abaInfo.classList.remove('active'); // NOVO
    });

    // NOVO EVENTO PARA A 3ª ABA
    btnAbaInfo.addEventListener('click', function() {
        // Ativa o botão
        btnAbaAnalisador.classList.remove('active');
        btnAbaCalculadora.classList.remove('active');
        btnAbaInfo.classList.add('active');
        // Mostra o conteúdo
        abaAnalisador.classList.remove('active');
        abaCalculadora.classList.remove('active');
        abaInfo.classList.add('active');
    });
    // --- FIM DA LÓGICA DAS ABAS ---


    // --- LÓGICA: CALCULADORA DE TAXAS (Sem alteração) ---
    const tipoTaxa = document.getElementById('tipo-taxa');
    const divVbbm = document.getElementById('div-vbbm');
    const divAreaTaxa = document.getElementById('div-area-taxa');
    const divDiasTaxa = document.getElementById('div-dias-taxa');
    
    const inputVbbm = document.getElementById('vbbm');
    const inputAreaTaxa = document.getElementById('area-taxa');
    const inputDiasTaxa = document.getElementById('dias-taxa');

    const btnCalcularTaxa = document.getElementById('btn-calcular-taxa');
    const resultadoTaxaContainer = document.getElementById('resultado-taxa-container');
    const resultadoTaxaValor = document.getElementById('resultado-taxa-valor');

    tipoTaxa.addEventListener('change', function() {
        const selecao = tipoTaxa.value;
        divAreaTaxa.style.display = 'none';
        divDiasTaxa.style.display = 'none';

        if (selecao === 'evento') {
            divAreaTaxa.style.display = 'block';
            divDiasTaxa.style.display = 'block';
        } else if (selecao.includes('maior-750')) {
            divAreaTaxa.style.display = 'block';
        }
    });

    btnCalcularTaxa.addEventListener('click', function() {
        const selecao = tipoTaxa.value;
        const vbbm = parseFloat(inputVbbm.value) || 0;
        const area = parseFloat(inputAreaTaxa.value) || 0;
        const dias = parseInt(inputDiasTaxa.value) || 0;

        let taxaCalculada = 0;

        if (vbbm === 0 && selecao !== "") {
            alert('Por favor, insira o valor do VBBM.');
            return;
        }

        switch (selecao) {
            case 'evento':
                taxaCalculada = 0.004 * area * dias * vbbm;
                break;
            case 'ca-maior-750':
            case 'cap-maior-750':
                taxaCalculada = 0.02 * area * vbbm;
                break;
            case 'ca-menor-750':
            case 'cap-menor-750':
                taxaCalculada = 10 * vbbm;
                break;
            case 'renovacao-maior-750':
                taxaCalculada = 0.008 * area * vbbm;
                break;
            case 'renovacao-menor-750':
                taxaCalculada = 5 * vbbm;
                break;
            default:
                if (selecao === "") {
                    alert('Por favor, selecione um tipo de taxa.');
                }
                return;
        }

        const valorFormatado = taxaCalculada.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        resultadoTaxaValor.textContent = valorFormatado;
        resultadoTaxaContainer.style.display = 'block';
    });
    // --- FIM DA LÓGICA DA CALCULADORA ---


    // --- LÓGICA DO ANALISADOR DE PROCESSOS (Sem alteração) ---
    const form = document.getElementById('form-analise');
    const eventoTemporario = document.getElementById('evento-temporario');
    const secaoPermanente = document.getElementById('secao-permanente');
    const tipoAtividade = document.getElementById('tipo-atividade');
    const areaTotal = document.getElementById('area-total');
    const altura = document.getElementById('altura');
    const pavimentos = document.getElementById('pavimentos');
    const lotacao = document.getElementById('lotacao');
    const usoF11 = document.getElementById('uso-f11');
    const usoHotel = document.getElementById('uso-hotel');
    const usoHospital = document.getElementById('uso-hospital');
    const usoAsilo = document.getElementById('uso-asilo');
    const grupoLeitos = document.getElementById('grupo-leitos');
    const nLeitos = document.getElementById('n-leitos');
    const liquidoInflamavel = document.getElementById('liquido-inflamavel');
    const glp = document.getElementById('glp');
    const revendaGlp = document.getElementById('revenda-glp');
    const outrosGases = document.getElementById('outros-gases');
    const produtosPerigosos = document.getElementById('produtos-perigosos');
    const subsoloDistinto = document.getElementById('subsolo-distinto');
    const cargaIncendio = document.getElementById('carga-incendio');
    const sistemasFixos = document.getElementById('sistemas-fixos');
    const isolamento = document.getElementById('isolamento');
    const btnAnalisar = document.getElementById('btn-analisar');
    const resultadoContainer = document.getElementById('resultado-container');
    const resultadoTexto = document.getElementById('resultado-texto');
    const resultadoDocumentos = document.getElementById('resultado-documentos'); 
    
    eventoTemporario.addEventListener('change', function() {
        if (eventoTemporario.value === 'sim') {
            secaoPermanente.style.display = 'none';
        } else {
            secaoPermanente.style.display = 'block';
        }
    });

    usoHotel.addEventListener('change', function() {
        if (usoHotel.checked) {
            grupoLeitos.style.display = 'block';
        } else {
            grupoLeitos.style.display = 'none';
            nLeitos.value = 0; 
        }
    });

    btnAnalisar.addEventListener('click', function() {
        if (eventoTemporario.value === 'sim') {
            exibirResultado('Processo Técnico para Evento Temporário', 'evento');
            return; 
        }
        const area = parseFloat(areaTotal.value) || 0;
        const alt = parseFloat(altura.value) || 0;
        const pav = parseInt(pavimentos.value) || 0;
        const lot = parseInt(lotacao.value) || 0;
        const leitos = parseInt(nLeitos.value) || 0;
        const liqInf = parseFloat(liquidoInflamavel.value) || 0;
        const gasGlp = parseFloat(glp.value) || 0;

        if (area > 750 || alt > 12 || subsoloDistinto.checked || cargaIncendio.checked || sistemasFixos.checked || isolamento.checked) {
            exibirResultado('Processo Técnico', 'processo-tecnico');
            return; 
        }
        if (tipoAtividade.value === 'residencia-mei' || tipoAtividade.value === 'sem-estabelecimento') {
            exibirResultado('Processo Técnico Simplificado (Baixo Risco)', 'simplificado-baixo');
            return;
        }
        const eBaixoRisco_5_1_4 = (
            area <= 200 && pav <= 2 && lot <= 100 && !usoF11.checked &&
            liqInf <= 250 && gasGlp <= 90 &&
            (!usoHotel.checked || (usoHotel.checked && leitos <= 16)) &&
            !usoHospital.checked && !usoAsilo.checked && !revendaGlp.checked &&
            !outrosGases.checked && !produtosPerigosos.checked
        );
        if (eBaixoRisco_5_1_4) {
            exibirResultado('Processo Técnico Simplificado (Baixo Risco)', 'simplificado-baixo');
            return;
        }
        const eMedioRisco_5_2 = (
            lot <= 200 && !usoF11.checked && liqInf <= 500 && gasGlp <= 190 &&
            (!usoHotel.checked || (usoHotel.checked && leitos <= 40)) &&
            !usoHospital.checked && !usoAsilo.checked &&
            !outrosGases.checked && !produtosPerigosos.checked
        );
        if (eMedioRisco_5_2) {
            exibirResultado('Processo Técnico Simplificado (Médio Risco)', 'simplificado-medio');
            return;
        }
        exibirResultado('Processo Técnico', 'processo-tecnico');
    });

    function exibirResultado(texto, identificador) {
        resultadoTexto.textContent = texto;
        resultadoDocumentos.innerHTML = documentosDB[identificador] || "<p>Erro: Documentação não encontrada.</p>";
        resultadoContainer.classList.remove('resultado-processo-tecnico', 'resultado-simplificado', 'resultado-evento');
        
        if (identificador === 'processo-tecnico') {
            resultadoContainer.classList.add('resultado-processo-tecnico');
        } else if (identificador === 'evento') {
            resultadoContainer.classList.add('resultado-evento');
        } else if (identificador.includes('simplificado')) {
            resultadoContainer.classList.add('resultado-simplificado');
        }
        
        resultadoContainer.style.display = 'block';
        resultadoContainer.scrollIntoView({ behavior: 'smooth' });
    }
    // --- FIM DA LÓGICA DO ANALISADOR ---


    // --- NOVA LÓGICA: ABA DE INFORMAÇÕES (ACORDEÃO E COPIAR) ---
    
    // Lógica do Acordeão
    const accordions = document.querySelectorAll('.accordion-title');
    accordions.forEach(acc => {
        acc.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            
            // Alterna a classe 'active' para controlar o CSS
            content.classList.toggle('active'); 
        });
    });

    // Lógica do Botão Copiar
    const copyButtons = document.querySelectorAll('.btn-copiar');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target-id');
            const targetElement = document.getElementById(targetId);
            let textToCopy = '';

            if (targetElement.tagName === 'A') {
                // Se for um link, copia o URL
                textToCopy = targetElement.href;
            } else {
                // Se for um bloco de texto, copia o texto interno
                textToCopy = targetElement.innerText;
            }

            navigator.clipboard.writeText(textToCopy).then(() => {
                // Feedback visual
                const originalText = this.textContent;
                this.textContent = 'Copiado!';
                this.style.backgroundColor = '#28a745'; // Verde
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.backgroundColor = '#007bff'; // Azul original
                }, 2000);
            }).catch(err => {
                console.error('Falha ao copiar texto: ', err);
                alert('Falha ao copiar. Por favor, copie manualmente.');
            });
        });
    });
    // --- FIM DA LÓGICA DA ABA DE INFORMAÇÕES ---

});
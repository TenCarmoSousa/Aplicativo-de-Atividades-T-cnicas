// --- BANCO DE DADOS DE DOCUMENTOS ---
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

// Base carregada do arquivo nt14_cnae.json no repositório do GitHub
let nt14CnaeDB = [];

async function carregarBaseNT14() {
    try {
        const resposta = await fetch('nt14_cnae.json');
        if (!resposta.ok) {
            throw new Error(`HTTP ${resposta.status}`);
        }
        const dados = await resposta.json();
        nt14CnaeDB = dados.filter(item =>
            item &&
            item.cnae !== 'CNAE' &&
            item.descricao !== 'Descrição'
        );
    } catch (erro) {
        console.error('Erro ao carregar nt14_cnae.json:', erro);
        nt14CnaeDB = [
            { cnae: "4711-3/02", descricao: "Supermercados", grupo: "Comercial", divisao: "C-2", carga: "400 MJ/m²" }
        ];
    }
}

document.addEventListener("DOMContentLoaded", async function() {
    await carregarBaseNT14();

    // --- LÓGICA DAS 4 ABAS ---
    const tabsConfig = [
        { btn: document.getElementById('btn-aba-analisador'), panel: document.getElementById('aba-analisador') },
        { btn: document.getElementById('btn-aba-calculadora'), panel: document.getElementById('aba-calculadora') },
        { btn: document.getElementById('btn-aba-cnae'), panel: document.getElementById('aba-cnae') },
        { btn: document.getElementById('btn-aba-info'), panel: document.getElementById('aba-info') }
    ];

    tabsConfig.forEach(({ btn, panel }) => {
        btn.addEventListener('click', function() {
            tabsConfig.forEach(item => {
                item.btn.classList.remove('active');
                item.btn.setAttribute('aria-selected', 'false');
                item.panel.classList.remove('active');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            panel.classList.add('active');
        });
    });

    // --- LÓGICA: CALCULADORA DE TAXAS ---
    const tipoTaxa = document.getElementById('tipo-taxa');
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
        const dias = parseInt(inputDiasTaxa.value, 10) || 0;

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

        resultadoTaxaValor.textContent = taxaCalculada.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
        resultadoTaxaContainer.style.display = 'block';
    });

    // --- LÓGICA DO ANALISADOR DE PROCESSOS ---
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
        secaoPermanente.style.display = eventoTemporario.value === 'sim' ? 'none' : 'block';
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
        const pav = parseInt(pavimentos.value, 10) || 0;
        const lot = parseInt(lotacao.value, 10) || 0;
        const leitos = parseInt(nLeitos.value, 10) || 0;
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

    // --- LÓGICA DA 3ª ABA: CNAE & CARGA DE INCÊNDIO (NT 14/2021) ---
    const modoCnae = document.getElementById('modo-cnae');
    const buscaCnae = document.getElementById('busca-cnae');
    const grupoAtividadeReal = document.getElementById('grupo-atividade-real');
    const atividadeReal = document.getElementById('atividade-real');
    const sugestoesCnae = document.getElementById('sugestoes-cnae');
    const btnLimparCnae = document.getElementById('btn-limpar-cnae');
    const btnIdentificarCnae = document.getElementById('btn-identificar-cnae');
    const btnCompararCnae = document.getElementById('btn-comparar-cnae');
    const resultadoCnaeContainer = document.getElementById('resultado-cnae-container');

    function normalizarTexto(str) {
        return (str || '')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function normalizarCodigo(str) {
        return (str || '').replace(/[^0-9a-z]/gi, '').toLowerCase();
    }

    modoCnae.addEventListener('change', function() {
        grupoAtividadeReal.style.display = modoCnae.value === 'divergente' ? 'block' : 'none';
    });

    function buscarCorrespondencias(termoRaw) {
        const termoNorm = normalizarTexto(termoRaw);
        const codNorm = normalizarCodigo(termoRaw);
        if (!termoNorm && !codNorm) return [];

        const tokens = termoNorm.split(' ').filter(t => t.length >= 2);

        return nt14CnaeDB
            .map(item => {
                const itemCod = normalizarCodigo(item.cnae);
                const itemDesc = normalizarTexto(item.descricao);
                const itemGrupo = normalizarTexto(item.grupo);
                let score = 0;

                if (codNorm && itemCod === codNorm) score += 120;
                else if (codNorm && itemCod.includes(codNorm)) score += 75;

                if (termoNorm && itemDesc.includes(termoNorm)) score += 60;
                if (termoNorm && itemGrupo.includes(termoNorm)) score += 25;

                tokens.forEach(tok => {
                    if (itemDesc.includes(tok)) score += 18;
                    if (itemGrupo.includes(tok)) score += 8;
                    if (itemCod.includes(tok)) score += 20;
                });

                return { item, score };
            })
            .filter(entry => entry.score > 0)
            .sort((a, b) => b.score - a.score)
            .map(entry => entry.item);
    }

    function renderizarSugestoes(lista) {
        if (!lista.length) {
            sugestoesCnae.style.display = 'none';
            sugestoesCnae.innerHTML = '';
            return;
        }

        sugestoesCnae.innerHTML = lista.slice(0, 8).map((item, idx) => `
            <div class="autocomplete-item" data-index="${idx}">
                <div class="autocomplete-top">
                    <span class="cnae-tag">${item.cnae}</span>
                    <span class="div-tag">Divisão ${item.divisao} • ${item.carga}</span>
                </div>
                <div class="autocomplete-desc">${item.descricao}</div>
                <div class="autocomplete-meta">Grupo/Ocupação: ${item.grupo}</div>
            </div>
        `).join('');

        sugestoesCnae.style.display = 'block';

        sugestoesCnae.querySelectorAll('.autocomplete-item').forEach((el, idx) => {
            el.addEventListener('click', function() {
                const escolhido = lista[idx];
                buscaCnae.value = `${escolhido.cnae} - ${escolhido.descricao}`;
                sugestoesCnae.style.display = 'none';
                exibirFichaCnae(escolhido, false);
            });
        });
    }

    buscaCnae.addEventListener('input', function() {
        const matches = buscarCorrespondencias(buscaCnae.value);
        renderizarSugestoes(matches);
    });

    btnLimparCnae.addEventListener('click', function() {
        buscaCnae.value = '';
        atividadeReal.value = '';
        sugestoesCnae.style.display = 'none';
        resultadoCnaeContainer.style.display = 'none';
        buscaCnae.focus();
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.autocomplete-wrapper')) {
            sugestoesCnae.style.display = 'none';
        }
    });

    function exibirFichaCnae(item, modoComparativo) {
        let alertaDivergencia = '';
        if (modoCnae.value === 'divergente' && atividadeReal.value.trim()) {
            const matchesReal = buscarCorrespondencias(atividadeReal.value);
            const principalReal = matchesReal[0];
            alertaDivergencia = `
                <div class="cnae-nota-tecnica" style="margin-bottom: 12px; border-left-color: #fbbf24;">
                    <strong>Comparação de Divergência:</strong> CNAE/termo inicial (<em>${item.cnae}</em>) vs. atividade informada no local (<em>"${atividadeReal.value.trim()}"</em>).
                    ${principalReal
                        ? `<br>Correspondência sugerida para a atividade real: <strong>CNAE ${principalReal.cnae}</strong> — Divisão <strong>${principalReal.divisao}</strong> (${principalReal.carga}).`
                        : `<br>Nenhuma correspondência literal direta para a atividade real; avalie por <strong>similaridade</strong> conforme item 5.2 da NT 14/2021.`
                    }
                </div>
            `;
        }

        const notaEspecial = item.grupo.toLowerCase().includes('depósito')
            ? 'Atenção (itens 5.2 e 5.3 da NT 14): para depósitos (Grupo J), utilize obrigatoriamente a tabela de altura de armazenamento do Anexo B ou similaridade.'
            : (item.grupo.toLowerCase().includes('explosivo')
                ? 'Atenção (item 5.1 da NT 14): para Grupo L e ocupações especiais (Grupo M), aplica-se o método determinístico do Anexo C.'
                : 'Referência conforme Anexo A da NT 14/2021 (CBMMA). Em caso de divergência entre CNAE e uso real, prevalece a ocupação/atividade efetiva da edificação.');

        resultadoCnaeContainer.innerHTML = `
            <div class="cnae-result-card">
                <div class="cnae-result-header">
                    <div>
                        <span class="cnae-tag">CNAE ${item.cnae}</span>
                        <div class="cnae-result-title" style="margin-top: 6px;">${item.descricao}</div>
                    </div>
                    <span class="div-tag">${item.grupo}</span>
                </div>

                ${alertaDivergencia}

                <div class="cnae-metrics-grid">
                    <div class="metric-box">
                        <div class="metric-label">Divisão (NT 14)</div>
                        <div class="metric-value">${item.divisao}</div>
                    </div>
                    <div class="metric-box">
                        <div class="metric-label">Carga de Incêndio</div>
                        <div class="metric-value">${item.carga}</div>
                    </div>
                    <div class="metric-box">
                        <div class="metric-label">Grupo / Ocupação</div>
                        <div class="metric-value" style="font-size: 1.05rem;">${item.grupo}</div>
                    </div>
                </div>

                <div class="cnae-nota-tecnica">
                    ${modoComparativo ? '<strong>Análise Comparativa:</strong> ' : ''}${notaEspecial}
                </div>
            </div>
        `;
        resultadoCnaeContainer.style.display = 'block';
    }

    function executarAnaliseCnae(modoComparativo) {
        sugestoesCnae.style.display = 'none';
        const consultaPrincipal = buscaCnae.value.trim();
        const consultaAlternativa = atividadeReal.value.trim();
        const termoAtivo = consultaPrincipal || (modoCnae.value === 'divergente' ? consultaAlternativa : '');

        if (!termoAtivo) {
            alert('Digite o CNAE principal ou o tipo de atividade exercida na edificação.');
            return;
        }

        const matches = buscarCorrespondencias(termoAtivo);

        if (matches.length === 1 || (!modoComparativo && matches.length > 0)) {
            exibirFichaCnae(matches[0], modoComparativo);
            return;
        }

        if (matches.length > 1 && modoComparativo) {
            resultadoCnaeContainer.innerHTML = `
                <div class="cnae-result-card">
                    <div class="cnae-result-header">
                        <div class="cnae-result-title">Comparação de Itens Semelhantes na NT 14/2021 (${matches.length} encontrados)</div>
                        <span class="div-tag">Termo: "${termoAtivo}"</span>
                    </div>
                    <p class="section-subtitle" style="margin-bottom: 10px;">
                        Selecione uma ocupação abaixo para visualizar a Divisão e a Carga de Incêndio detalhadas:
                    </p>
                    <div class="similar-list">
                        ${matches.slice(0, 6).map((m, i) => `
                            <button type="button" class="similar-card-btn" data-sim-idx="${i}">
                                <strong>[${m.cnae}] ${m.descricao}</strong><br>
                                <span class="autocomplete-meta">Divisão: <strong>${m.divisao}</strong> • Carga de Incêndio: <strong>${m.carga}</strong> • ${m.grupo}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>
            `;
            resultadoCnaeContainer.style.display = 'block';

            resultadoCnaeContainer.querySelectorAll('.similar-card-btn').forEach((btn, idx) => {
                btn.addEventListener('click', function() {
                    buscaCnae.value = `${matches[idx].cnae} - ${matches[idx].descricao}`;
                    exibirFichaCnae(matches[idx], true);
                });
            });
            return;
        }

        resultadoCnaeContainer.innerHTML = `
            <div class="cnae-result-card">
                <div class="cnae-result-header">
                    <div class="cnae-result-title">CNAE ou Atividade não encontrada literalmente</div>
                    <span class="div-tag">Item 5.2 — Similaridade</span>
                </div>
                <div class="cnae-nota-tecnica">
                    Conforme o <strong>item 5.2 da NT 14/2021</strong>, ocupações não listadas podem ter seus valores de carga de incêndio específica determinados por <strong>similaridade</strong> (admitindo-se também similaridade entre edificações comerciais do Grupo "C" e industriais do Grupo "I"). Tente buscar por palavras-chave genéricas como <em>comércio</em>, <em>depósito</em>, <em>oficina</em>, <em>clínica</em>, <em>fabricação</em> ou <em>escritório</em>.
                </div>
            </div>
        `;
        resultadoCnaeContainer.style.display = 'block';
    }

    btnIdentificarCnae.addEventListener('click', function() {
        executarAnaliseCnae(false);
    });

    btnCompararCnae.addEventListener('click', function() {
        executarAnaliseCnae(true);
    });

    // --- LÓGICA DA ABA DE INFORMAÇÕES (ACORDEÃO E COPIAR) ---
    const accordions = document.querySelectorAll('.accordion-title');
    accordions.forEach(acc => {
        acc.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            content.classList.toggle('active');
        });
    });

    const copyButtons = document.querySelectorAll('.btn-copiar');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target-id');
            const targetElement = document.getElementById(targetId);
            const textToCopy = targetElement.tagName === 'A' ? targetElement.href : targetElement.innerText;

            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = this.textContent;
                this.textContent = 'Copiado!';
                this.style.background = 'linear-gradient(135deg, #15803d, #22c55e)';

                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = 'linear-gradient(135deg, #991b1b, #dc2626)';
                }, 2000);
            }).catch(err => {
                console.error('Falha ao copiar texto: ', err);
                alert('Falha ao copiar. Por favor, copie manualmente.');
            });
        });
    });
});

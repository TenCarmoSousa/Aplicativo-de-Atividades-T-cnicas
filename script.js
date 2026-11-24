// =========================================================================
// BANCO DE DADOS DE DOCUMENTOS (ABA 1 — ANALISADOR DE PROCESSOS)
// =========================================================================
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
            <li><strong>Documentos Adicionais (Apresentar <em>se houver</em> o respectivo item no local):</strong>
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

// =========================================================================
// INICIALIZAÇÃO PRINCIPAL
// =========================================================================
document.addEventListener("DOMContentLoaded", function () {

    // ---------------------------------------------------------------------
    // 1. ANIMAÇÃO DE FUNDO TECNOLÓGICO (PARTÍCULAS / BRASAS E CONEXÕES)
    // ---------------------------------------------------------------------
    iniciarCanvasTecnologico();

    // ---------------------------------------------------------------------
    // 2. NAVEGAÇÃO ENTRE AS 4 ABAS
    // ---------------------------------------------------------------------
    const botoesAbas = [
        { btn: document.getElementById('btn-aba-analisador'), painel: document.getElementById('aba-analisador') },
        { btn: document.getElementById('btn-aba-calculadora'), painel: document.getElementById('aba-calculadora') },
        { btn: document.getElementById('btn-aba-cnae'), painel: document.getElementById('aba-cnae') },
        { btn: document.getElementById('btn-aba-info'), painel: document.getElementById('aba-info') }
    ];

    botoesAbas.forEach(item => {
        if (!item.btn || !item.painel) return;

        item.btn.addEventListener('click', function () {
            botoesAbas.forEach(outro => {
                if (!outro.btn || !outro.painel) return;
                outro.btn.classList.remove('active');
                outro.btn.setAttribute('aria-selected', 'false');
                outro.painel.classList.remove('active');
            });

            item.btn.classList.add('active');
            item.btn.setAttribute('aria-selected', 'true');
            item.painel.classList.add('active');
        });
    });

    // ---------------------------------------------------------------------
    // 3. ABA 1: ANALISADOR DE PROCESSOS (LÓGICA PRESERVADA)
    // ---------------------------------------------------------------------
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

    eventoTemporario.addEventListener('change', function () {
        secaoPermanente.style.display = (eventoTemporario.value === 'sim') ? 'none' : 'block';
    });

    usoHotel.addEventListener('change', function () {
        if (usoHotel.checked) {
            grupoLeitos.style.display = 'block';
        } else {
            grupoLeitos.style.display = 'none';
            nLeitos.value = 0;
        }
    });

    btnAnalisar.addEventListener('click', function () {
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
        resultadoContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // ---------------------------------------------------------------------
    // 4. ABA 2: CALCULADORA DE TAXAS (LÓGICA PRESERVADA)
    // ---------------------------------------------------------------------
    const tipoTaxa = document.getElementById('tipo-taxa');
    const divAreaTaxa = document.getElementById('div-area-taxa');
    const divDiasTaxa = document.getElementById('div-dias-taxa');
    const inputVbbm = document.getElementById('vbbm');
    const inputAreaTaxa = document.getElementById('area-taxa');
    const inputDiasTaxa = document.getElementById('dias-taxa');
    const btnCalcularTaxa = document.getElementById('btn-calcular-taxa');
    const resultadoTaxaContainer = document.getElementById('resultado-taxa-container');
    const resultadoTaxaValor = document.getElementById('resultado-taxa-valor');

    tipoTaxa.addEventListener('change', function () {
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

    btnCalcularTaxa.addEventListener('click', function () {
        const selecao = tipoTaxa.value;
        const vbbm = parseFloat(inputVbbm.value) || 0;
        const area = parseFloat(inputAreaTaxa.value) || 0;
        const dias = parseInt(inputDiasTaxa.value, 10) || 0;

        let taxaCalculada = 0;

        if (selecao === "") {
            alert('Por favor, selecione um tipo de taxa.');
            return;
        }

        if (vbbm === 0) {
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
                return;
        }

        const valorFormatado = taxaCalculada.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        resultadoTaxaValor.textContent = valorFormatado;
        resultadoTaxaContainer.style.display = 'block';
        resultadoTaxaContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    // ---------------------------------------------------------------------
    // 5. ABA 3 (NOVA E INDEPENDENTE): CONSULTA DE CNAE E CARGA DE INCÊNDIO
    //    Carrega os dados do arquivo externo: dados_nt14.json
    // ---------------------------------------------------------------------
    let baseNT14 = [];
    let sugestoesAtuais = [];
    let indiceAtivo = -1;
    let itemSelecionado = null;

    const statusBaseEl = document.getElementById('status-base-cnae');
    const filtroOcupacaoEl = document.getElementById('filtro-ocupacao-cnae');
    const inputCnaeBusca = document.getElementById('input-cnae-busca');
    const btnLimparCnae = document.getElementById('btn-limpar-cnae');
    const listaSugestoesEl = document.getElementById('lista-sugestoes-cnae');
    const btnBuscarCnae = document.getElementById('btn-buscar-cnae');

    const resultadoCnaeContainer = document.getElementById('resultado-cnae-container');
    const semResultadoCnae = document.getElementById('sem-resultado-cnae');
    const btnCopiarCnae = document.getElementById('btn-copiar-cnae');

    const resDescricao = document.getElementById('res-cnae-descricao');
    const resDivisao = document.getElementById('res-cnae-divisao');
    const resCarga = document.getElementById('res-cnae-carga');
    const resRisco = document.getElementById('res-cnae-risco');
    const resBarra = document.getElementById('res-cnae-barra');
    const resCodigo = document.getElementById('res-cnae-codigo');
    const resOcupacao = document.getElementById('res-cnae-ocupacao');
    const resAlerta = document.getElementById('res-cnae-alerta');

    // Utilitários de normalização para busca tolerante a acentos, pontos e traços
    function normalizarTexto(str) {
        return (str || '')
            .toString()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function extrairDigitos(str) {
        return (str || '').toString().replace(/[^0-9]/g, '');
    }

    function escaparHtml(str) {
        return (str || '')
            .toString()
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    // Carregamento assíncrono do arquivo JSON da NT 14
    async function carregarBaseNT14() {
        try {
            const resposta = await fetch('dados_nt14.json', { cache: 'no-cache' });
            if (!resposta.ok) {
                throw new Error(`HTTP ${resposta.status}`);
            }

            const dados = await resposta.json();
            if (!Array.isArray(dados)) {
                throw new Error('Formato JSON inválido.');
            }

            // Pré-indexa campos normalizados para busca instantânea em tempo real
            baseNT14 = dados.map(item => ({
                ocupacao: item.ocupacao || 'Não informada',
                descricao: item.descricao || '',
                divisao: item.divisao || '--',
                cnae: item.cnae || '',
                carga_incendio: (typeof item.carga_incendio === 'number' && !Number.isNaN(item.carga_incendio))
                    ? item.carga_incendio
                    : null,
                observacao: item.observacao || '',
                _ocupNorm: normalizarTexto(item.ocupacao),
                _descNorm: normalizarTexto(item.descricao),
                _divNorm: normalizarTexto(item.divisao),
                _cnaeNorm: normalizarTexto(item.cnae),
                _cnaeDigits: extrairDigitos(item.cnae)
            }));

            statusBaseEl.textContent = `Base NT 14 ativa • ${baseNT14.length} registros`;
            statusBaseEl.classList.remove('status-error');
            statusBaseEl.classList.add('status-ok');
        } catch (erro) {
            console.error('Erro ao carregar dados_nt14.json:', erro);
            statusBaseEl.textContent = 'Erro ao carregar dados_nt14.json';
            statusBaseEl.classList.remove('status-ok');
            statusBaseEl.classList.add('status-error');
        }
    }

    carregarBaseNT14();

    // Motor de busca e ranqueamento por CNAE ou atividade real
    function pesquisarNT14(termoBruto, filtroOcupacao) {
        if (!baseNT14.length) return [];

        const termoNorm = normalizarTexto(termoBruto);
        const termoDigits = extrairDigitos(termoBruto);
        const filtroNorm = normalizarTexto(filtroOcupacao);

        let candidatos = baseNT14;
        if (filtroOcupacao && filtroOcupacao !== 'todos') {
            candidatos = baseNT14.filter(item => item._ocupNorm === filtroNorm);
        }

        // Se o campo estiver vazio, exibe os primeiros itens do grupo selecionado (ou da tabela)
        if (!termoNorm) {
            return candidatos.slice(0, 25);
        }

        const stopwords = new Set(['de', 'da', 'do', 'das', 'dos', 'e', 'em', 'para', 'com', 'por', 'a', 'o', 'as', 'os', 'ou', 'no', 'na']);
        const tokensBrutos = termoNorm.split(/[\s,;\-\/().]+/).filter(Boolean);
        const tokens = tokensBrutos.filter(t => t.length > 1 && !stopwords.has(t));
        const tokensEfetivos = tokens.length ? tokens : tokensBrutos;

        const resultados = [];

        for (const item of candidatos) {
            let score = 0;

            // 1. Correspondência por código CNAE (ignora pontos, traços e barras)
            if (termoDigits.length >= 2 && item._cnaeDigits) {
                if (item._cnaeDigits === termoDigits) {
                    score += 1000;
                } else if (item._cnaeDigits.startsWith(termoDigits)) {
                    score += 650;
                } else if (item._cnaeDigits.includes(termoDigits)) {
                    score += 320;
                }
            }

            // 2. Correspondência exata ou de início na descrição ou divisão
            if (item._descNorm === termoNorm) {
                score += 900;
            } else if (item._descNorm.startsWith(termoNorm)) {
                score += 480;
            } else if (item._descNorm.includes(termoNorm)) {
                score += 300;
            }

            if (item._divNorm === termoNorm) {
                score += 380;
            }

            // 3. Correspondência por palavras-chave em qualquer ordem (ideal para atividade real)
            if (tokensEfetivos.length > 0) {
                let acertos = 0;
                const textoCompleto = `${item._descNorm} ${item._ocupNorm} ${item._divNorm} ${item._cnaeNorm}`;

                for (const tk of tokensEfetivos) {
                    if (item._descNorm.includes(tk)) {
                        acertos++;
                        score += 70;
                    } else if (textoCompleto.includes(tk)) {
                        acertos++;
                        score += 35;
                    }
                }

                // Bônus se TODAS as palavras digitadas estiverem presentes
                if (acertos === tokensEfetivos.length) {
                    score += 220;
                } else if (tokensEfetivos.length >= 2 && acertos === 0) {
                    score = 0;
                } else if (tokensEfetivos.length >= 2 && acertos < Math.ceil(tokensEfetivos.length * 0.5)) {
                    score = Math.floor(score * 0.4);
                }
            }

            if (score > 0) {
                resultados.push({ item, score });
            }
        }

        resultados.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return a.item.descricao.localeCompare(b.item.descricao, 'pt-BR');
        });

        return resultados.slice(0, 30).map(r => r.item);
    }

    // Destaca o trecho buscado dentro da sugestão
    function destacarTermo(texto, termoBruto) {
        const seguro = escaparHtml(texto);
        const tokens = (termoBruto || '')
            .trim()
            .split(/\s+/)
            .filter(t => t.length >= 2);

        if (!tokens.length) return seguro;

        const regexPartes = tokens.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
        const regex = new RegExp(`(${regexPartes.join('|')})`, 'gi');
        return seguro.replace(regex, '<mark>$1</mark>');
    }

    // Renderiza a lista suspensa de autocomplete
    function renderizarSugestoes(lista, termoBruto) {
        sugestoesAtuais = lista;
        indiceAtivo = -1;

        if (!lista.length) {
            listaSugestoesEl.innerHTML = '';
            listaSugestoesEl.style.display = 'none';
            return;
        }

        const html = lista.map((item, idx) => {
            const cnaeLabel = item.cnae ? item.cnae : 'Sem CNAE específico';
            const cargaLabel = (item.carga_incendio !== null)
                ? `${item.carga_incendio.toLocaleString('pt-BR')} MJ/m²`
                : 'Anexo B';

            return `
                <li class="autocomplete-item" role="option" data-index="${idx}">
                    <div class="sug-top">
                        <span class="sug-cnae">${escaparHtml(cnaeLabel)}</span>
                        <span class="sug-div">Divisão ${escaparHtml(item.divisao)}</span>
                        <span class="sug-carga">${escaparHtml(cargaLabel)}</span>
                    </div>
                    <div class="sug-desc">${destacarTermo(item.descricao, termoBruto)}</div>
                    <div class="sug-ocup">${escaparHtml(item.ocupacao)}</div>
                </li>
            `;
        }).join('');

        listaSugestoesEl.innerHTML = html;
        listaSugestoesEl.style.display = 'block';

        listaSugestoesEl.querySelectorAll('.autocomplete-item').forEach(li => {
            li.addEventListener('mousedown', function (e) {
                e.preventDefault();
                const index = parseInt(this.getAttribute('data-index'), 10);
                selecionarItemNT14(sugestoesAtuais[index]);
            });
        });
    }

    function fecharSugestoes() {
        listaSugestoesEl.style.display = 'none';
        indiceAtivo = -1;
    }

    function atualizarDestaqueTeclado() {
        const itens = listaSugestoesEl.querySelectorAll('.autocomplete-item');
        itens.forEach((el, i) => {
            if (i === indiceAtivo) {
                el.classList.add('active-option');
                el.scrollIntoView({ block: 'nearest' });
            } else {
                el.classList.remove('active-option');
            }
        });
    }

    // Seleciona um item e exibe o cartão completo de enquadramento
    function selecionarItemNT14(item) {
        if (!item) return;
        itemSelecionado = item;
        inputCnaeBusca.value = item.cnae ? `${item.cnae} — ${item.descricao}` : item.descricao;
        btnLimparCnae.style.display = 'flex';
        fecharSugestoes();
        exibirResultadoNT14(item);
    }

    function classificarRiscoNT14(item) {
        if (item.carga_incendio === null) {
            return {
                label: 'Anexo B (Depósito)',
                classe: 'risco-especial',
                largura: 65,
                corBarra: 'linear-gradient(90deg, #0284c7, #38bdf8)'
            };
        }

        const qfi = item.carga_incendio;
        if (qfi <= 300) {
            const pct = Math.max(12, Math.min(33, Math.round((qfi / 300) * 33)));
            return {
                label: 'Risco Baixo',
                classe: 'risco-baixo',
                largura: pct,
                corBarra: 'linear-gradient(90deg, #059669, #34d399)'
            };
        }

        if (qfi <= 1200) {
            const pct = Math.max(38, Math.min(68, Math.round(33 + ((qfi - 300) / 900) * 35)));
            return {
                label: 'Risco Médio',
                classe: 'risco-medio',
                largura: pct,
                corBarra: 'linear-gradient(90deg, #d97706, #fbbf24)'
            };
        }

        const pct = Math.max(76, Math.min(100, Math.round(68 + Math.min((qfi - 1200) / 2800, 1) * 32)));
        return {
            label: 'Risco Alto',
            classe: 'risco-alto',
            largura: pct,
            corBarra: 'linear-gradient(90deg, #b91c1c, #ef4444, #f97316)'
        };
    }

    function exibirResultadoNT14(item) {
        semResultadoCnae.style.display = 'none';

        const riscoInfo = classificarRiscoNT14(item);
        const cargaFormatada = (item.carga_incendio !== null)
            ? `${item.carga_incendio.toLocaleString('pt-BR')} MJ/m²`
            : 'Conforme Anexo B';

        resDescricao.textContent = item.descricao;
        resDivisao.textContent = item.divisao || '--';
        resCarga.textContent = cargaFormatada;
        resRisco.textContent = riscoInfo.label;

        // Atualiza classe visual da caixa de risco
        const boxRisco = resRisco.closest('.metric-risco');
        boxRisco.classList.remove('risco-baixo', 'risco-medio', 'risco-alto', 'risco-especial');
        boxRisco.classList.add(riscoInfo.classe);

        // Anima a barra de intensidade
        resBarra.style.width = '0%';
        resBarra.style.background = riscoInfo.corBarra;
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                resBarra.style.width = `${riscoInfo.largura}%`;
            });
        });

        resCodigo.textContent = item.cnae || 'Não especificado na tabela (identificação pela atividade)';
        resOcupacao.textContent = item.ocupacao;

        // Monta alertas normativos conforme procedimentos da NT 14/2021
        const alertas = [];
        const divUpper = (item.divisao || '').toUpperCase();

        if (divUpper.startsWith('J') || item._ocupNorm === 'deposito') {
            alertas.push('<strong>Atenção (Item 5.3 da NT 14/2021):</strong> As ocupações do <strong>Grupo "J" (Depósito)</strong> devem adotar obrigatoriamente a tabela relativa à altura de armazenagem constante do <strong>Anexo B</strong>.');
        }
        if (divUpper.startsWith('L') || divUpper.startsWith('M') || item._ocupNorm === 'explosivo' || item._ocupNorm === 'especial') {
            alertas.push('<strong>Atenção (Item 5.1 da NT 14/2021):</strong> Para edificações destinadas a explosivos (<strong>Grupo "L"</strong>) e ocupações especiais (<strong>Grupo "M"</strong>), aplica-se a metodologia do <strong>Anexo C</strong> (método determinístico).');
        }
        if (item.carga_incendio !== null && item.carga_incendio > 1200) {
            alertas.push('<strong>Carga de Incêndio Elevada (&gt; 1.200 MJ/m²):</strong> Classificada como <strong>Risco Alto</strong> — atente-se às exigências de Processo Técnico e medidas preventivas correspondentes.');
        }
        if (item.observacao) {
            alertas.push(`<strong>Observação da NT 14:</strong> ${escaparHtml(item.observacao)}`);
        }

        if (alertas.length > 0) {
            resAlerta.innerHTML = alertas.join('<br><br>');
            resAlerta.style.display = 'block';
        } else {
            resAlerta.style.display = 'none';
            resAlerta.innerHTML = '';
        }

        resultadoCnaeContainer.style.display = 'block';
        resultadoCnaeContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Eventos de digitação, foco, teclado e filtro da Aba 3
    inputCnaeBusca.addEventListener('input', function () {
        const valor = this.value;
        itemSelecionado = null;
        btnLimparCnae.style.display = valor.length > 0 ? 'flex' : 'none';

        if (!valor.trim()) {
            fecharSugestoes();
            return;
        }

        const encontrados = pesquisarNT14(valor, filtroOcupacaoEl.value);
        renderizarSugestoes(encontrados, valor);
    });

    inputCnaeBusca.addEventListener('focus', function () {
        const valor = this.value;
        if (valor.trim() || filtroOcupacaoEl.value !== 'todos') {
            const encontrados = pesquisarNT14(valor, filtroOcupacaoEl.value);
            renderizarSugestoes(encontrados, valor);
        }
    });

    inputCnaeBusca.addEventListener('keydown', function (e) {
        const listaVisivel = listaSugestoesEl.style.display === 'block' && sugestoesAtuais.length > 0;

        if (e.key === 'ArrowDown' && listaVisivel) {
            e.preventDefault();
            indiceAtivo = (indiceAtivo + 1) % sugestoesAtuais.length;
            atualizarDestaqueTeclado();
        } else if (e.key === 'ArrowUp' && listaVisivel) {
            e.preventDefault();
            indiceAtivo = (indiceAtivo - 1 + sugestoesAtuais.length) % sugestoesAtuais.length;
            atualizarDestaqueTeclado();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (listaVisivel && indiceAtivo >= 0) {
                selecionarItemNT14(sugestoesAtuais[indiceAtivo]);
            } else {
                btnBuscarCnae.click();
            }
        } else if (e.key === 'Escape') {
            fecharSugestoes();
        }
    });

    filtroOcupacaoEl.addEventListener('change', function () {
        itemSelecionado = null;
        const valor = inputCnaeBusca.value;
        const encontrados = pesquisarNT14(valor, this.value);
        renderizarSugestoes(encontrados, valor);
    });

    btnLimparCnae.addEventListener('click', function () {
        inputCnaeBusca.value = '';
        itemSelecionado = null;
        this.style.display = 'none';
        fecharSugestoes();
        resultadoCnaeContainer.style.display = 'none';
        semResultadoCnae.style.display = 'none';
        inputCnaeBusca.focus();
    });

    document.addEventListener('click', function (e) {
        if (!e.target.closest('.cnae-search-wrapper')) {
            fecharSugestoes();
        }
    });

    btnBuscarCnae.addEventListener('click', function () {
        if (!baseNT14.length) {
            alert('A base da NT 14 ainda não foi carregada. Verifique se o arquivo dados_nt14.json está na mesma pasta.');
            return;
        }

        if (itemSelecionado) {
            exibirResultadoNT14(itemSelecionado);
            return;
        }

        const termo = inputCnaeBusca.value.trim();
        if (!termo && filtroOcupacaoEl.value === 'todos') {
            alert('Digite um código CNAE ou a atividade exercida na edificação.');
            inputCnaeBusca.focus();
            return;
        }

        const encontrados = pesquisarNT14(termo, filtroOcupacaoEl.value);
        if (encontrados.length > 0) {
            selecionarItemNT14(encontrados[0]);
        } else {
            fecharSugestoes();
            resultadoCnaeContainer.style.display = 'none';
            semResultadoCnae.style.display = 'block';
            semResultadoCnae.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });

    // Botão copiar enquadramento da NT 14
    btnCopiarCnae.addEventListener('click', function () {
        if (!itemSelecionado) return;

        const riscoInfo = classificarRiscoNT14(itemSelecionado);
        const cargaTxt = (itemSelecionado.carga_incendio !== null)
            ? `${itemSelecionado.carga_incendio.toLocaleString('pt-BR')} MJ/m²`
            : 'Conforme Anexo B';

        const resumo = [
            'ENQUADRAMENTO NT 14/2021 (CBMMA)',
            `Ocupação/Uso: ${itemSelecionado.ocupacao}`,
            `Atividade: ${itemSelecionado.descricao}`,
            `CNAE: ${itemSelecionado.cnae || 'Não especificado'}`,
            `Divisão: ${itemSelecionado.divisao}`,
            `Carga de Incêndio Específica (qfi): ${cargaTxt} (${riscoInfo.label})`
        ].join('\n');

        navigator.clipboard.writeText(resumo).then(() => {
            const original = this.textContent;
            this.textContent = 'Copiado!';
            this.style.backgroundColor = '#059669';
            setTimeout(() => {
                this.textContent = original;
                this.style.backgroundColor = '';
            }, 2000);
        }).catch(() => {
            alert('Não foi possível copiar automaticamente.');
        });
    });

    // ---------------------------------------------------------------------
    // 6. ABA 4: INFORMAÇÕES (ACORDEÃO E BOTÃO COPIAR)
    // ---------------------------------------------------------------------
    const accordions = document.querySelectorAll('.accordion-title');
    accordions.forEach(acc => {
        acc.addEventListener('click', function () {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            content.classList.toggle('active');
        });
    });

    const copyButtons = document.querySelectorAll('.btn-copiar');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target-id');
            const targetElement = document.getElementById(targetId);
            if (!targetElement) return;

            const textToCopy = (targetElement.tagName === 'A')
                ? targetElement.href
                : targetElement.innerText;

            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = this.textContent;
                this.textContent = 'Copiado!';
                this.style.background = '#059669';

                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = '';
                }, 2000);
            }).catch(err => {
                console.error('Falha ao copiar texto: ', err);
                alert('Falha ao copiar. Por favor, copie manualmente.');
            });
        });
    });
});

// =========================================================================
// MOTOR DE PARTÍCULAS TECNOLÓGICAS (FUNDO ANIMADO)
// =========================================================================
function iniciarCanvasTecnologico() {
    const canvas = document.getElementById('bg-particles-canvas');
    if (!canvas) return;

    // Respeita preferência do usuário por movimento reduzido
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let largura = 0;
    let altura = 0;
    let particulas = [];

    function redimensionar() {
        largura = canvas.width = window.innerWidth;
        altura = canvas.height = window.innerHeight;

        const quantidade = largura < 768 ? 26 : 52;
        particulas = Array.from({ length: quantidade }, () => ({
            x: Math.random() * largura,
            y: Math.random() * altura,
            vx: (Math.random() - 0.5) * 0.45,
            vy: -0.15 - Math.random() * 0.42, // Movimento ascendente sutil (efeito brasa/dados)
            raio: 1.2 + Math.random() * 2.1,
            alpha: 0.25 + Math.random() * 0.55,
            cor: Math.random() > 0.35 ? '239, 68, 68' : '249, 115, 22'
        }));
    }

    function desenhar() {
        ctx.clearRect(0, 0, largura, altura);

        for (let i = 0; i < particulas.length; i++) {
            const p = particulas[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.y < -10) {
                p.y = altura + 10;
                p.x = Math.random() * largura;
            }
            if (p.x < -10) p.x = largura + 10;
            if (p.x > largura + 10) p.x = -10;

            // Desenha ponto luminoso
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.raio, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.cor}, ${p.alpha})`;
            ctx.fill();

            // Conexões sutis entre nós próximos (visual rede tecnológica)
            for (let j = i + 1; j < particulas.length; j++) {
                const q = particulas[j];
                const dx = p.x - q.x;
                const dy = p.y - q.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 135) {
                    const opacidade = (1 - dist / 135) * 0.16;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.strokeStyle = `rgba(239, 68, 68, ${opacidade.toFixed(3)})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(desenhar);
    }

    redimensionar();
    window.addEventListener('resize', redimensionar);
    desenhar();
}

(() => {
  'use strict';

  const STORAGE_KEY = 'acompanhamento-escolar-demo-v3';
  const TERMS = ['1', '2', '3'];
  const STATUS_CYCLE = ['VAZIO', 'APRENDIZAGEM_ADEQUADA', 'EM_DESENVOLVIMENTO', 'APRENDIZAGEM_INSUFICIENTE'];
  const STATUS_LABEL = {
    VAZIO: 'Selecionar status',
    APRENDIZAGEM_ADEQUADA: 'Aprendizagem adequada',
    EM_DESENVOLVIMENTO: 'Em desenvolvimento',
    APRENDIZAGEM_INSUFICIENTE: 'Aprendizagem insuficiente'
  };
  const PROFILE_OPTIONS = [
    ['TURMA_PARTICIPATIVA_PRODUTIVA','Participativa e produtiva','positive','Há envolvimento e produção consistente.'],
    ['TURMA_COLABORATIVA_RESPEITOSA','Colaborativa e respeitosa','positive','Predominam cooperação e respeito.'],
    ['TURMA_BOM_RENDIMENTO','Bom rendimento geral','positive','A turma apresenta desempenho satisfatório.'],
    ['TURMA_HETEROGENEA','Níveis variados','neutral','Há diferenças relevantes entre os níveis.'],
    ['TURMA_DEFASAGEM_APRENDIZAGEM','Defasagem de aprendizagem','attention','Há lacunas de conhecimentos anteriores.'],
    ['TURMA_NECESSITA_INTERVENCAO','Necessita intervenção','danger','Requer ação pedagógica planejada.'],
    ['TURMA_APATICA_DESINTERESSADA','Apática ou desinteressada','attention','Baixo envolvimento nas atividades.'],
    ['TURMA_AGITADA_INDISCIPLINA','Agitada e indisciplinada','danger','A disciplina interfere na aprendizagem.'],
    ['TURMA_CONVERSAS_PARALELAS','Conversas paralelas','attention','As conversas prejudicam a concentração.'],
    ['TURMA_ALTA_FREQUENCIA_FALTAS','Alta frequência de faltas','danger','As ausências afetam o acompanhamento.']
  ];
  const REASONS = [
    ['NAO_ENTREGA_ATIVIDADES','Não entrega atividades','Acadêmico'],
    ['DEFASAGEM_PRE_REQUISITOS','Defasagem de pré-requisitos','Acadêmico'],
    ['RITMO_ABAIXO_MEDIA','Ritmo abaixo da média','Acadêmico'],
    ['ALUNO_FALTOSO','Frequência insuficiente','Frequência'],
    ['INDISCIPLINA_DESATENCAO','Indisciplina ou desatenção','Participação'],
    ['INTERVENCAO_FAMILIA','Necessidade de intervenção familiar','Família']
  ];
  const PAGE_META = {
    dashboard: ['Início', 'Visão geral', 'Acompanhamento escolar em um só lugar.'],
    buscar: ['Acompanhamento', 'Buscar estudante', 'Pesquise pelo nome, RA/CGM ou turma.'],
    atendimento: ['Acompanhamento pedagógico', 'Novo atendimento', 'O registro será incluído automaticamente na ficha individual.'],
    'prof-atendimento': ['Acompanhamento pedagógico', 'Atendimento a professores', 'Orientações e acompanhamentos realizados pela equipe pedagógica.'],
    ocorrencias: ['Disciplinar', 'Fichas de ocorrência', 'Registros demonstrativos derivados do fato observado.'],
    'busca-ativa': ['Disciplinar', 'Busca ativa', 'Acompanhe contatos e encaminhamentos com as famílias.'],
    preconselho: ['Pré-Conselho', 'Avaliação trimestral', 'Avalie a turma por trimestre e disciplina.'],
    turmas: ['Gestão escolar', 'Turmas e estudantes', 'Consulte matrículas e abra as fichas individuais.'],
    professores: ['Gestão escolar', 'Professores', 'Cadastre docentes e acompanhe sua situação.'],
    disciplinas: ['Gestão escolar', 'Disciplinas e matriz', 'Organize o catálogo e as disciplinas de cada turma.'],
    usuarios: ['Configurações', 'Usuários e acessos', 'Prévia do gerenciamento de perfis.']
  };

  const DEMO = {
    schoolName: 'Colégio Júlio Mesquita',
    schoolYear: 2026,
    classes: [
      { id: '3A', name: '3º A', shift: 'Manhã', course: 'ADMINISTRAÇÃO', subjects: ['Língua Portuguesa', 'Matemática', 'Educação Física', 'Física', 'Projeto de Vida', 'Educação Financeira', 'Adm. Financeira e Orçamentária', 'Recursos Humanos'] },
      { id: '3B', name: '3º B', shift: 'Manhã', course: 'DESENVOLVIMENTO DE SISTEMAS', subjects: ['Língua Portuguesa', 'Matemática', 'Educação Física', 'Física', 'Projeto de Vida', 'Educação Financeira', 'Análise e Projeto de Sistemas', 'Banco de Dados', 'Programação Back-end', 'Programação Mobile'] },
      { id: '2D', name: '2º D', shift: 'Manhã', course: 'EDIFICAÇÕES', subjects: ['Arte', 'Educação Física', 'Língua Inglesa', 'Língua Portuguesa', 'Filosofia', 'História', 'Sociologia', 'Matemática', 'Educação Financeira', 'Física', 'Programação', 'Robótica', 'Cidadania e Civismo'] },
      { id: '9A', name: '9º A', shift: 'Manhã', course: 'ENSINO FUNDAMENTAL', subjects: ['Arte', 'Ciências', 'Educação Física', 'Geografia', 'História', 'Língua Portuguesa', 'Língua Inglesa', 'Matemática', 'Educação Digital', 'Cidadania e Civismo'] }
    ],
    students: [
      { id: 'al-001', name: 'Aluno 01', ra: 'DEMO-0001', classId: '3A', status: 'ATIVO', birth: '14/03/2009', responsibles: 'Responsável 01', phone: '(00) 90000-0001', email: 'aluno01@example.com', labels: ['SRM'], profile: { difficulties: 'Apresenta dificuldade pontual em organização de estudos.', srm: 'Não', report: 'Sim', reportDetails: 'Laudo demonstrativo cadastrado.', family: 'Acompanhamento familiar regular.', observations: 'Exemplo de ficha para apresentação.' } },
      { id: 'al-002', name: 'Aluno 02', ra: 'DEMO-0002', classId: '3A', status: 'ATIVO', birth: '22/07/2009', responsibles: 'Responsável 02', phone: '(00) 90000-0002', email: 'aluno02@example.com', labels: [], profile: { difficulties: 'Sem registro no momento.', srm: 'Não', report: 'Não', reportDetails: '', family: 'Contato realizado no início do ano.', observations: '' } },
      { id: 'al-003', name: 'Aluno 03', ra: 'DEMO-0003', classId: '3A', status: 'ATIVO', birth: '08/11/2009', responsibles: 'Responsável 03', phone: '(00) 90000-0003', email: 'aluno03@example.com', labels: [], profile: { difficulties: 'Acompanhamento de leitura e produção textual.', srm: 'Não', report: 'Não', reportDetails: '', family: 'Aguardando reunião.', observations: '' } },
      { id: 'al-004', name: 'Aluno 04', ra: 'DEMO-0004', classId: '3B', status: 'ATIVO', birth: '19/01/2009', responsibles: 'Responsável 04', phone: '(00) 90000-0004', email: 'aluno04@example.com', labels: ['ACOMPANHAMENTO'], profile: { difficulties: 'Necessita acompanhamento de frequência e rotina.', srm: 'Não', report: 'Não', reportDetails: '', family: 'Responsável contatado.', observations: 'Registro demonstrativo.' } },
      { id: 'al-005', name: 'Aluno 05', ra: 'DEMO-0005', classId: '3B', status: 'ATIVO', birth: '02/05/2009', responsibles: 'Responsável 05', phone: '(00) 90000-0005', email: 'aluno05@example.com', labels: [], profile: { difficulties: 'Sem dificuldades registradas.', srm: 'Não', report: 'Não', reportDetails: '', family: 'Acompanhamento regular.', observations: '' } },
      { id: 'al-006', name: 'Aluno 06', ra: 'DEMO-0006', classId: '2D', status: 'ATIVO', birth: '28/09/2008', responsibles: 'Responsável 06', phone: '(00) 90000-0006', email: 'aluno06@example.com', labels: ['LAUDO'], profile: { difficulties: 'Dificuldade de atenção em atividades extensas.', srm: 'Sim', report: 'Sim', reportDetails: 'Laudo demonstrativo para teste do painel.', family: 'Reunião realizada no trimestre anterior.', observations: '' } },
      { id: 'al-007', name: 'Aluno 07', ra: 'DEMO-0007', classId: '9A', status: 'ATIVO', birth: '17/06/2011', responsibles: 'Responsável 07', phone: '(00) 90000-0007', email: 'aluno07@example.com', labels: [], profile: { difficulties: 'Acompanhamento de frequência.', srm: 'Não', report: 'Não', reportDetails: '', family: 'Contato pendente.', observations: '' } }
    ],
    teachers: [
      { id: 'p-1', name: 'Professor 01', email: 'professor01@example.com', subjects: 'Língua Portuguesa, Redação', status: 'ATIVO' },
      { id: 'p-2', name: 'Professor 02', email: 'professor02@example.com', subjects: 'Programação, Banco de Dados', status: 'ATIVO' },
      { id: 'p-3', name: 'Professor 03', email: 'professor03@example.com', subjects: 'Língua Inglesa', status: 'ATIVO' },
      { id: 'p-4', name: 'Professor 04', email: 'professor04@example.com', subjects: 'História, Sociologia', status: 'INATIVO' }
    ],
    teacherAttendances: [
      { id:'tp-1', date:'08/08/2026, 14:10', teacherId:'p-1', type:'ACOMPANHAMENTO', subject:'Planejamento de recuperação', report:'Análise das estratégias adotadas com a turma.', guidance:'Reorganizar as atividades e acompanhar os resultados.', followup:true, status:'EM_ACOMPANHAMENTO', owner:'Equipe pedagógica' },
      { id:'tp-2', date:'02/08/2026, 09:20', teacherId:'p-2', type:'ORIENTACAO', subject:'Acompanhamento de turma', report:'Orientação sobre registro de dificuldades individuais.', guidance:'Manter observações objetivas no pré-conselho.', followup:false, status:'CONCLUIDO', owner:'Equipe pedagógica' },
      { id:'tp-3', date:'29/07/2026, 16:00', teacherId:'p-3', type:'DEVOLUTIVA', subject:'Estratégias de participação', report:'Devolutiva sobre participação e rendimento.', guidance:'Retomar na próxima reunião pedagógica.', followup:true, status:'REGISTRADO', owner:'Equipe pedagógica' }
    ],
    users: [
      { name: 'Administrador demonstrativo', login: 'admin', profile: 'ADMINISTRADOR', status: 'ATIVO', last: 'Agora' },
      { name: 'Professor 01', login: 'professor01', profile: 'DOCENTE', status: 'ATIVO', last: 'Hoje, 10:22' },
      { name: 'Equipe pedagógica', login: 'pedagogia', profile: 'PEDAGOGIA', status: 'ATIVO', last: 'Ontem, 16:18' }
    ],
    attendances: [
      { id: 'at-1', date: '08/08/2026', studentId: 'al-001', sector: 'PEDAGOGIA', type: 'Acompanhamento', description: 'Reunião de acompanhamento da aprendizagem.', action: 'Retomar contato no próximo conselho.', owner: 'Equipe pedagógica', status: 'Em acompanhamento' },
      { id: 'at-2', date: '06/08/2026', studentId: 'al-006', sector: 'MILITAR', type: 'Frequência', description: 'Conversa sobre faltas recorrentes.', action: 'Contato com responsável.', owner: 'Corpo cívico-militar', status: 'Registrado' },
      { id: 'at-3', date: '04/08/2026', studentId: 'al-004', sector: 'DOCENTE', type: 'Acolhimento', description: 'Atendimento solicitado pelo professor.', action: 'Encaminhado à pedagogia.', owner: 'Professor 02', status: 'Concluído' }
    ],
    occurrences: [
      { date: '07/08/2026', studentId: 'al-004', fact: 'Uso inadequado de aparelho durante a aula.', status: 'Em acompanhamento' },
      { date: '31/07/2026', studentId: 'al-007', fact: 'Conflito verbal entre estudantes.', status: 'Registrado' }
    ],
    activeSearch: [
      { studentId: 'al-007', reason: 'Frequência abaixo do esperado', lastContact: 'Ainda não realizado', status: 'Pendente' },
      { studentId: 'al-004', reason: 'Ausências consecutivas', lastContact: '05/08/2026', status: 'Em acompanhamento' }
    ],
    evaluations: {
      '3A|Língua Portuguesa|1': {
        'al-001':{grade:8.4,status:'APRENDIZAGEM_ADEQUADA',reasons:[],descriptors:[],observation:'Participa e realiza as atividades propostas.'},
        'al-002':{grade:6.8,status:'EM_DESENVOLVIMENTO',reasons:['RITMO_ABAIXO_MEDIA'],descriptors:['LP02'],observation:'Precisa ampliar a autonomia na produção escrita.'},
        'al-003':{grade:5.2,status:'APRENDIZAGEM_INSUFICIENTE',reasons:['NAO_ENTREGA_ATIVIDADES','DEFASAGEM_PRE_REQUISITOS'],descriptors:['LP01','LP02'],observation:'Necessita retomada de leitura e produção textual.'}
      },
      '3A|Matemática|1': {
        'al-001':{grade:8.1,status:'APRENDIZAGEM_ADEQUADA',reasons:[],descriptors:[],observation:''},
        'al-002':{grade:7.0,status:'EM_DESENVOLVIMENTO',reasons:[],descriptors:['MAT01'],observation:''},
        'al-003':{grade:5.8,status:'APRENDIZAGEM_INSUFICIENTE',reasons:['DEFASAGEM_PRE_REQUISITOS'],descriptors:['MAT01'],observation:'Dificuldade na resolução de problemas.'}
      }
    },
    classProfiles: {
      '3A|Língua Portuguesa|1':{profiles:['TURMA_PARTICIPATIVA_PRODUTIVA','TURMA_HETEROGENEA'],observation:'Boa participação oral, com níveis variados na escrita.'}
    },
    councils: {},
    pedagogyAssessments: {},
    descriptors: {
      'Língua Portuguesa':[{id:'LP01',label:'Localizar informações explícitas'},{id:'LP02',label:'Produzir texto com coerência'},{id:'LP03',label:'Reconhecer efeitos de sentido'}],
      'Matemática':[{id:'MAT01',label:'Resolver problemas com operações'},{id:'MAT02',label:'Interpretar gráficos e tabelas'},{id:'MAT03',label:'Aplicar relações geométricas'}]
    }
  };

  let state = loadState();
  let currentPage = 'dashboard';
  let selectedStudentId = null;
  let selectedClassId = state.classes[0]?.id || '';
  let profileTab = 'dados';
  let councilTab = 'profile';
  let profileSubject = state.classes[0]?.subjects[0] || '';

  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (!saved || typeof saved !== 'object') return clone(DEMO);
      const base = clone(DEMO);
      const merged = { ...base, ...saved };
      merged.classes = Array.isArray(saved.classes) && saved.classes.length ? saved.classes : base.classes;
      merged.students = (Array.isArray(saved.students) && saved.students.length ? saved.students : base.students).map((student, index) => {
        const fallback = base.students[index % base.students.length];
        return {
          ...fallback,
          ...student,
          profile: { ...fallback.profile, ...(student.profile || {}) },
          labels: Array.isArray(student.labels) ? student.labels : (fallback.labels || [])
        };
      });
      merged.teachers = Array.isArray(saved.teachers) ? saved.teachers : base.teachers;
      merged.teacherAttendances = Array.isArray(saved.teacherAttendances) ? saved.teacherAttendances : base.teacherAttendances;
      merged.users = Array.isArray(saved.users) ? saved.users : base.users;
      merged.attendances = Array.isArray(saved.attendances) ? saved.attendances : base.attendances;
      merged.occurrences = Array.isArray(saved.occurrences) ? saved.occurrences : base.occurrences;
      merged.activeSearch = Array.isArray(saved.activeSearch) ? saved.activeSearch : base.activeSearch;
      merged.evaluations = saved.evaluations && typeof saved.evaluations === 'object' ? saved.evaluations : {};
      merged.classProfiles = saved.classProfiles && typeof saved.classProfiles === 'object' ? saved.classProfiles : {};
      merged.councils = saved.councils && typeof saved.councils === 'object' ? saved.councils : {};
      merged.pedagogyAssessments = saved.pedagogyAssessments && typeof saved.pedagogyAssessments === 'object' ? saved.pedagogyAssessments : {};
      merged.descriptors = saved.descriptors && typeof saved.descriptors === 'object' ? saved.descriptors : base.descriptors;
      return merged;
    } catch (_) { return clone(DEMO); }
  }
  function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  function $(selector) { return document.querySelector(selector); }
  function $$(selector) { return Array.from(document.querySelectorAll(selector)); }
  function esc(value) { return String(value ?? '').replace(/[&<>"']/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[ch])); }
  function initials(name) { return String(name || '').split(/\s+/).slice(0,2).map(x => x[0]).join('').toUpperCase(); }
  function studentById(id) { return state.students.find(s => s.id === id); }
  function classById(id) { return state.classes.find(c => c.id === id); }
  function className(id) { return classById(id)?.name || 'Sem turma'; }
  function formatNow() { return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date()); }
  function showToast(message) { const toast = $('#toast'); toast.textContent = message; toast.classList.add('show'); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove('show'), 2800); }
  function setNote(id, message, type = '') { const el = $(id); if (!el) return; el.textContent = message; el.className = `form-note ${type}`; }

  function navigate(page) {
    if (!PAGE_META[page]) page = 'dashboard';
    currentPage = page;
    $$('.page').forEach(el => el.classList.toggle('active', el.id === `page-${page}`));
    $$('.nav-item').forEach(el => el.classList.toggle('active', el.dataset.page === page));
    const meta = PAGE_META[page];
    $('#pageEyebrow').textContent = meta[0]; $('#pageTitle').textContent = meta[1]; $('#pageSubtitle').textContent = meta[2];
    closeMobileMenu();
    if (page === 'dashboard') renderDashboard();
    if (page === 'buscar') renderStudentSearch();
    if (page === 'atendimento') renderAttendanceForm();
    if (page === 'prof-atendimento') renderProfessionalAttendance();
    if (page === 'ocorrencias') renderOccurrences();
    if (page === 'busca-ativa') renderActiveSearch();
    if (page === 'preconselho') renderEvaluation();
    if (page === 'turmas') renderClasses();
    if (page === 'professores') renderTeachers();
    if (page === 'disciplinas') renderSubjects();
    if (page === 'usuarios') renderUsers();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderDashboard() {
    const metrics = [
      ['Turmas ativas', state.classes.length, 'Ano letivo 2026', 'blue'],
      ['Estudantes ativos', state.students.filter(s => s.status === 'ATIVO').length, 'Matrículas atuais', 'green'],
      ['Estudantes com laudo', state.students.filter(s => (s.profile || {}).report === 'Sim').length, 'Atenção individual', 'orange'],
      ['Atendimentos recentes', state.attendances.length, 'Registros locais', 'red']
    ];
    $('#dashboardMetrics').innerHTML = metrics.map(m => `<div class="metric"><div class="metric-label">${m[0]}</div><div class="metric-value">${m[1]}</div><div class="metric-foot"><span class="dot ${m[3]}"></span>${m[2]}</div></div>`).join('');
    $('#recentList').innerHTML = state.attendances.slice().reverse().slice(0,5).map(a => { const s = studentById(a.studentId); return `<div class="recent-row clickable" data-student="${s.id}"><span class="recent-date">${esc(a.date)}</span><div class="recent-main"><strong>${esc(s.name)}</strong><span>${esc(a.sector)} · ${esc(a.type)} · ${esc(className(s.classId))}</span></div><span class="status-pill ${a.status === 'Concluído' ? 'status-active' : 'status-pending'}">${esc(a.status)}</span></div>`; }).join('') || '<div class="empty-state">Nenhum atendimento registrado.</div>';
    $('#laudoList').innerHTML = state.students.filter(s => (s.profile || {}).report === 'Sim').map(s => `<div class="laudo-row clickable" data-student="${s.id}"><span class="laudo-avatar">${initials(s.name)}</span><div class="laudo-main"><strong>${esc(s.name)}</strong><span>${esc(className(s.classId))} · RA/CGM ${esc(s.ra)}</span></div><span class="status-pill status-pending">LAUDO</span></div>`).join('') || '<div class="empty-state">Nenhum estudante marcado.</div>';
  }

  function fillClassSelect(select, includeAll = false) {
    if (!select) return;
    const previous = select.value;
    select.innerHTML = `${includeAll ? '<option value="">Todas as turmas</option>' : ''}${state.classes.map(c => `<option value="${esc(c.id)}">${esc(c.name)} · ${esc(c.shift)}</option>`).join('')}`;
    if ([...select.options].some(o => o.value === previous)) select.value = previous; else if (state.classes[0]) select.value = state.classes[0].id;
  }
  function renderStudentSearch() {
    fillClassSelect($('#studentClassFilter'), true);
    const search = ($('#studentSearch')?.value || '').trim().toLowerCase(); const classId = $('#studentClassFilter')?.value || '';
    const list = state.students.filter(s => (!classId || s.classId === classId) && (!search || `${s.name} ${s.ra}`.toLowerCase().includes(search)));
    $('#studentResultCount').textContent = `${list.length} estudante(s) encontrado(s)`;
    $('#studentResults').innerHTML = list.map(s => `<div class="student-result" data-student="${s.id}"><div><strong>${esc(s.name)}</strong><span>${esc(s.email)}</span></div><div class="result-extra"><strong>${esc(s.ra)}</strong><span>RA/CGM</span></div><div class="result-extra"><strong>${esc(className(s.classId))}</strong><span>${esc(s.status)}</span></div><span class="status-pill ${s.status === 'ATIVO' ? 'status-active' : 'status-transferred'}">${esc(s.status)}</span></div>`).join('') || '<div class="empty-state">Nenhum estudante corresponde aos filtros.</div>';
    if (selectedStudentId) renderProfile(selectedStudentId);
  }
  function openStudent(id) { selectedStudentId = id; profileTab = 'dados'; navigate('buscar'); renderProfile(id); setTimeout(() => $('#studentProfile')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80); }
  function renderProfile(id) {
    const s = studentById(id); if (!s) return; s.profile = s.profile || {}; const records = state.attendances.filter(a => a.studentId === id).reverse();
    const profile = $('#studentProfile'); profile.classList.remove('hidden');
    profile.innerHTML = `<article class="card"><div class="profile-head"><div class="profile-title"><h2>${esc(s.name)}</h2><p>RA/CGM ${esc(s.ra)} · ${esc(className(s.classId))} · ${esc(s.status)}</p></div><div class="profile-actions"><span class="status-pill ${s.status === 'ATIVO' ? 'status-active' : 'status-transferred'}">${esc(s.status)}</span><button class="btn btn-secondary" id="closeProfile">Fechar ficha</button><button class="btn btn-primary" id="printProfile">Imprimir / PDF</button></div></div><div class="profile-tabs"><button class="profile-tab ${profileTab === 'dados' ? 'active' : ''}" data-tab="dados">Dados pessoais</button><button class="profile-tab ${profileTab === 'acompanhamento' ? 'active' : ''}" data-tab="acompanhamento">Acompanhamento</button><button class="profile-tab ${profileTab === 'historico' ? 'active' : ''}" data-tab="historico">Histórico escolar</button><button class="profile-tab ${profileTab === 'atendimentos' ? 'active' : ''}" data-tab="atendimentos">Atendimentos (${records.length})</button></div><div class="profile-panel">${profileTab === 'dados' ? profileData(s) : ''}${profileTab === 'acompanhamento' ? profileAccompaniment(s) : ''}${profileTab === 'historico' ? profileHistory(s) : ''}${profileTab === 'atendimentos' ? profileAttendances(records) : ''}</div></article>`;
    $('#closeProfile').addEventListener('click', () => { selectedStudentId = null; profile.classList.add('hidden'); });
    $('#printProfile').addEventListener('click', () => window.print());
    $$('.profile-tab').forEach(btn => btn.addEventListener('click', () => { profileTab = btn.dataset.tab; renderProfile(id); }));
  }
  function profileData(s) { return `<div class="detail-grid"><div class="detail-item"><label>Nome completo</label><strong>${esc(s.name)}</strong></div><div class="detail-item"><label>RA/CGM</label><strong>${esc(s.ra)}</strong></div><div class="detail-item"><label>Nascimento</label><strong>${esc(s.birth)}</strong></div><div class="detail-item"><label>Responsável</label><strong>${esc(s.responsibles)}</strong></div><div class="detail-item"><label>Telefone do responsável</label><strong>${esc(s.phone)}</strong></div><div class="detail-item"><label>E-mail do aluno</label><strong>${esc(s.email)}</strong></div><div class="detail-item"><label>Turma atual</label><strong>${esc(className(s.classId))}</strong></div><div class="detail-item"><label>Ano letivo</label><strong>${state.schoolYear}</strong></div><div class="detail-item"><label>Situação</label><strong>${esc(s.status)}</strong></div></div><div class="profile-section"><h3>Observações cadastrais</h3><div class="text-block">${esc(s.profile.observations || 'Nenhuma observação cadastrada.')}</div></div>`; }
  function profileAccompaniment(s) { return `<div class="detail-grid"><div class="detail-item"><label>Dificuldades individuais</label><strong>${esc(s.profile.difficulties || 'Não informado')}</strong></div><div class="detail-item"><label>Atendido pela SRM</label><strong>${esc(s.profile.srm)}</strong></div><div class="detail-item"><label>Possui laudo</label><strong>${esc(s.profile.report)}</strong></div></div><div class="profile-section"><h3>Detalhes do laudo / atendimento especializado</h3><div class="text-block">${esc(s.profile.reportDetails || 'Nenhuma informação cadastrada.')}</div></div><div class="profile-section"><h3>Acompanhamento familiar</h3><div class="text-block">${esc(s.profile.family || 'Nenhuma informação cadastrada.')}</div></div>`; }
  function profileHistory(s) { return `<div class="profile-section"><h3>Histórico de matrícula</h3><div class="history-list"><div class="history-item"><strong>${esc(className(s.classId))} · ${state.schoolYear}</strong><small>Matrícula ativa</small><p>Registro demonstrativo. A ficha individual permanece associada ao estudante em caso de transferência.</p></div></div></div>`; }
  function profileAttendances(records) { return `<div class="profile-section"><h3>Histórico de atendimentos</h3><div class="history-list">${records.map(a => `<div class="history-item"><strong>${esc(a.type)} · ${esc(a.sector)}</strong><small>${esc(a.date)} · ${esc(a.status)} · ${esc(a.owner || 'Responsável não informado')}</small><p>${esc(a.description)}${a.action ? `<br><b>Encaminhamento:</b> ${esc(a.action)}` : ''}</p></div>`).join('') || '<div class="empty-state">Nenhum atendimento registrado.</div>'}</div></div>`; }

  function renderAttendanceForm() { fillClassSelect($('#attendanceClass')); updateAttendanceStudents(); }
  function updateAttendanceStudents() { const select = $('#attendanceStudent'); if (!select) return; const classId = $('#attendanceClass').value; select.innerHTML = state.students.filter(s => s.classId === classId).map(s => `<option value="${esc(s.id)}">${esc(s.name)} · ${esc(s.ra)}</option>`).join(''); }
  function saveAttendance(event) { event.preventDefault(); const student = studentById($('#attendanceStudent').value); if (!student) return; state.attendances.push({ id: `at-${Date.now()}`, date: formatNow(), studentId: student.id, sector: $('#attendanceSector').value, type: $('#attendanceType').value, description: $('#attendanceDescription').value.trim(), action: $('#attendanceAction').value.trim(), owner: $('#attendanceOwner').value.trim() || 'Usuário demonstrativo', status: $('#attendanceStatus').value }); saveState(); event.target.reset(); renderAttendanceForm(); setNote('#attendanceFeedback', 'Atendimento salvo na ficha demonstrativa.', 'success'); showToast('Registro salvo com sucesso.'); }

  function teacherById(id) { return state.teachers.find(t => t.id === id); }
  function teacherStatusLabel(value) { return ({REGISTRADO:'Registrado',EM_ACOMPANHAMENTO:'Em acompanhamento',CONCLUIDO:'Concluído'})[value] || value; }
  function teacherTypeLabel(value) { return ({ORIENTACAO:'Orientação',ACOMPANHAMENTO:'Acompanhamento',PLANEJAMENTO:'Planejamento',MEDIACAO:'Mediação',DEVOLUTIVA:'Devolutiva',OUTRO:'Outro'})[value] || value; }
  function renderProfessionalAttendance() {
    const teacherSelect = $('#teacherAttendanceTeacher');
    const filter = $('#teacherAttendanceFilter');
    const active = state.teachers.filter(t => t.status === 'ATIVO');
    if (teacherSelect) teacherSelect.innerHTML = '<option value="">Selecione…</option>' + active.map(t => `<option value="${esc(t.id)}">${esc(t.name)}</option>`).join('');
    if (filter) {
      const previous = filter.value;
      filter.innerHTML = '<option value="">Todos os professores</option>' + state.teachers.map(t => `<option value="${esc(t.id)}">${esc(t.name)}</option>`).join('');
      if ([...filter.options].some(o => o.value === previous)) filter.value = previous;
    }
    const selected = filter?.value || '';
    const records = state.teacherAttendances.filter(x => !selected || x.teacherId === selected).slice().reverse();
    $('#teacherAttendanceCount').textContent = `${records.length} registro(s) encontrado(s)`;
    $('#profAttendanceTable').innerHTML = records.map(x => { const t=teacherById(x.teacherId); const cls=x.status==='CONCLUIDO'?'status-active':x.status==='EM_ACOMPANHAMENTO'?'status-pending':'status-transferred'; return `<tr><td>${esc(x.date)}</td><td><strong>${esc(t?.name || 'Professor')}</strong><small class="muted">${esc(x.owner || '')}</small></td><td><strong>${esc(teacherTypeLabel(x.type))}</strong><small class="muted">${esc(x.subject)}</small><details class="record-detail"><summary>Ver registro</summary><p><b>Relato:</b> ${esc(x.report)}</p><p><b>Orientações:</b> ${esc(x.guidance || 'Não informado.')}</p></details></td><td>${x.followup?'<span class="status-pill status-pending">Retomar</span>':'<span class="muted">Não</span>'}</td><td><span class="status-pill ${cls}">${esc(teacherStatusLabel(x.status))}</span></td></tr>`; }).join('') || '<tr><td colspan="5"><div class="empty-state">Nenhum atendimento encontrado.</div></td></tr>';
  }
  function saveTeacherAttendance(event) {
    event.preventDefault();
    state.teacherAttendances.push({id:`tp-${Date.now()}`,date:formatNow(),teacherId:$('#teacherAttendanceTeacher').value,type:$('#teacherAttendanceType').value,subject:$('#teacherAttendanceSubject').value.trim(),report:$('#teacherAttendanceReport').value.trim(),guidance:$('#teacherAttendanceGuidance').value.trim(),followup:$('#teacherAttendanceFollowup').checked,status:$('#teacherAttendanceStatus').value,owner:'Usuário demonstrativo'});
    saveState(); event.target.reset(); $('#teacherAttendanceCard').classList.add('hidden'); renderProfessionalAttendance(); showToast('Atendimento ao professor registrado.');
  }
  function renderOccurrences() { $('#occurrenceTable').innerHTML = state.occurrences.map(x => { const s=studentById(x.studentId); return `<tr><td>${x.date}</td><td><strong>${esc(s.name)}</strong><small class="muted">${esc(className(s.classId))}</small></td><td>${esc(x.fact)}</td><td><span class="status-pill ${x.status === 'Registrado' ? 'status-pending' : 'status-active'}">${esc(x.status)}</span></td></tr>`; }).join(''); }
  function renderActiveSearch() { const pending=state.activeSearch.filter(x=>x.status==='Pendente').length; const acompanhamento=state.activeSearch.filter(x=>x.status==='Em acompanhamento').length; $('#activeSearchStats').innerHTML = [['Pendências',pending,'red'],['Em acompanhamento',acompanhamento,'orange'],['Contatos registrados',state.activeSearch.length-acompanhamento-pending,'green']].map(x=>`<div class="stat"><label>${x[0]}</label><strong>${x[1]}</strong><span class="metric-foot"><span class="dot ${x[2]}"></span>Dados demonstrativos</span></div>`).join(''); $('#activeSearchTable').innerHTML=state.activeSearch.map(x=>{const s=studentById(x.studentId);return `<tr><td><strong>${esc(s.name)}</strong></td><td>${esc(className(s.classId))}</td><td>${esc(x.reason)}</td><td>${esc(x.lastContact)}</td><td><span class="status-pill ${x.status==='Pendente'?'status-danger':'status-pending'}">${esc(x.status)}</span></td></tr>`}).join(''); }

  function contextKey(subject = '') { return `${$('#evaluationClass').value}|${subject}|${$('#evaluationTerm').value}`; }
  function evalKey() { return contextKey($('#evaluationSubject').value); }
  function councilKey() { return `${$('#evaluationClass').value}|${$('#evaluationTerm').value}`; }
  function updateEvaluationSubjects() {
    const c=classById($('#evaluationClass').value); const previous=$('#evaluationSubject').value;
    $('#evaluationSubject').innerHTML=(c?.subjects || []).map(s=>`<option value="${esc(s)}">${esc(s)}</option>`).join('');
    if ([...$('#evaluationSubject').options].some(o=>o.value===previous)) $('#evaluationSubject').value=previous;
    profileSubject=(c?.subjects||[]).includes(profileSubject)?profileSubject:(c?.subjects?.[0]||'');
  }
  function renderEvaluation() {
    fillClassSelect($('#evaluationClass')); updateEvaluationSubjects();
    const c=classById($('#evaluationClass').value);
    $('#evaluationHeading').textContent=`Estudantes · ${c?.name || ''}`;
    $('#evaluationHint').textContent=`${$('#evaluationSubject').value || 'Selecione uma disciplina'} · ${$('#evaluationTerm').value}º trimestre`;
    renderProfileSubjectList(); renderProfileEditor(); loadCollectiveFields(); renderPedagogy(); renderEvaluationRows(); renderCouncilSummary(); setCouncilTab(councilTab);
  }
  function setCouncilTab(tab) {
    councilTab=tab;
    $$('.council-tab').forEach(x=>x.classList.toggle('active',x.dataset.councilTab===tab));
    $$('.council-panel').forEach(x=>x.classList.toggle('active',x.id===`council-${tab}`));
    if(tab==='summary')renderCouncilSummary();
  }
  function profileRecord(subject=profileSubject) { return state.classProfiles[contextKey(subject)] || {profiles:[],observation:''}; }
  function renderProfileSubjectList() {
    const c=classById($('#evaluationClass').value);
    $('#profileSubjectList').innerHTML=(c?.subjects||[]).map(s=>{const r=profileRecord(s),done=(r.profiles||[]).length;return `<button type="button" class="subject-progress ${s===profileSubject?'active':''}" data-profile-subject="${esc(s)}"><span><strong>${esc(s)}</strong><small>${done?`${done} característica(s) salva(s)`:'Não avaliada'}</small></span><b class="${done?'done':''}">${done?'✓':'→'}</b></button>`}).join('');
  }
  function choiceCards(containerId, selected, prefix) {
    const set=new Set(selected||[]);
    $(containerId).innerHTML=PROFILE_OPTIONS.map(x=>`<button type="button" class="profile-choice ${x[2]} ${set.has(x[0])?'selected':''}" data-${prefix}-choice="${x[0]}"><span class="choice-check">${set.has(x[0])?'✓':''}</span><strong>${esc(x[1])}</strong><small>${esc(x[3])}</small></button>`).join('');
  }
  function renderProfileEditor() {
    const r=profileRecord(); $('#profileSubjectTitle').textContent=profileSubject||'Selecione uma disciplina';
    choiceCards('#profileChoices',r.profiles,'profile'); $('#profileObservation').value=r.observation||'';
    $('#profileSelectionCount').textContent=`${(r.profiles||[]).length} de 3`;
  }
  function toggleProfileChoice(code) {
    const key=contextKey(profileSubject),r=state.classProfiles[key]||{profiles:[],observation:''}; r.profiles=r.profiles||[];
    if(r.profiles.includes(code))r.profiles=r.profiles.filter(x=>x!==code); else if(r.profiles.length<3)r.profiles.push(code); else {showToast('Escolha no máximo três características.');return;}
    state.classProfiles[key]=r; renderProfileEditor();
  }
  function saveClassProfile() { const key=contextKey(profileSubject),r=state.classProfiles[key]||{profiles:[]};r.observation=$('#profileObservation').value.trim();state.classProfiles[key]=r;saveState();renderProfileSubjectList();setNote('#profileFeedback','Perfil da disciplina salvo.','success'); }
  function loadCollectiveFields() { const r=state.councils[councilKey()]||{};$('#councilStrengths').value=r.strengths||'';$('#councilImprovements').value=r.improvements||'';$('#councilStrategies').value=r.strategies||'';$('#councilReferrals').value=r.referrals||'';$('#councilNextMeeting').value=r.nextMeeting||''; }
  function saveCollective() { state.councils[councilKey()]={strengths:$('#councilStrengths').value.trim(),improvements:$('#councilImprovements').value.trim(),strategies:$('#councilStrategies').value.trim(),referrals:$('#councilReferrals').value.trim(),nextMeeting:$('#councilNextMeeting').value};saveState();setNote('#collectiveFeedback','Síntese coletiva salva.','success'); }
  function renderPedagogy() { const r=state.pedagogyAssessments[councilKey()]||{profiles:[]};choiceCards('#pedagogyChoices',r.profiles,'pedagogy');$('#pedagogyAttention').value=r.attention||'';$('#pedagogyObservation').value=r.observation||''; }
  function togglePedagogyChoice(code) { const key=councilKey(),r=state.pedagogyAssessments[key]||{profiles:[]};r.profiles=r.profiles||[];if(r.profiles.includes(code))r.profiles=r.profiles.filter(x=>x!==code);else if(r.profiles.length<3)r.profiles.push(code);else{showToast('Escolha no máximo três características.');return;}state.pedagogyAssessments[key]=r;renderPedagogy(); }
  function savePedagogy() { const key=councilKey(),r=state.pedagogyAssessments[key]||{profiles:[]};r.attention=$('#pedagogyAttention').value;r.observation=$('#pedagogyObservation').value.trim();state.pedagogyAssessments[key]=r;saveState();setNote('#pedagogyFeedback','Avaliação pedagógica salva.','success'); }
  function descriptorOptions(subject,selected) { const set=new Set(selected||[]);return (state.descriptors[subject]||[]).map(x=>`<label class="reason-chip descriptor ${set.has(x.id)?'selected':''}"><input type="checkbox" value="${esc(x.id)}" ${set.has(x.id)?'checked':''}><span><b>${esc(x.id)}</b>${esc(x.label)}</span></label>`).join('')||'<span class="muted">Nenhum descritor cadastrado para esta disciplina.</span>'; }
  function renderEvaluationRows() {
    const classId=$('#evaluationClass').value,subject=$('#evaluationSubject').value,list=state.students.filter(s=>s.classId===classId),values=state.evaluations[evalKey()]||{};
    $('#evaluationHeading').textContent=`Estudantes · ${className(classId)}`;$('#evaluationHint').textContent=`${subject} · ${$('#evaluationTerm').value}º trimestre · ${list.length} estudante(s)`;
    $('#evaluationTable').innerHTML=list.map(s=>{const v=values[s.id]||{status:'VAZIO',reasons:[],descriptors:[]},grade=v.grade??'',reasonCount=(v.reasons||[]).length,descCount=(v.descriptors||[]).length;return `<article class="student-evaluation" data-eval-row="${s.id}"><div class="student-eval-main"><div class="student-identity"><strong>${esc(s.name)}</strong><small>RA/CGM ${esc(s.ra)}</small></div><label class="grade-field"><span>Nota</span><input class="eval-grade" type="number" min="0" max="10" step="0.1" value="${esc(grade)}" placeholder="—"></label><div class="status-segments">${STATUS_CYCLE.slice(1).map(st=>`<button type="button" class="status-segment status-${st} ${v.status===st?'active':''}" data-set-status="${st}" data-student-id="${s.id}">${STATUS_LABEL[st]}</button>`).join('')}</div><button type="button" class="detail-toggle" data-toggle-eval="${s.id}"><span>Motivos, descritores e observação</span><b>${reasonCount+descCount?`${reasonCount+descCount} marcado(s)`:'Adicionar detalhes'} ↓</b></button></div><div class="student-eval-details hidden" id="eval-detail-${s.id}"><div class="detail-section"><h4>Motivos relacionados ao rendimento</h4><p>Marque apenas fatores observados ou confirmados. Eles ficam recolhidos para manter a lista limpa.</p><div class="reason-groups">${['Acadêmico','Frequência','Participação','Família'].map(group=>`<div><span class="reason-group-title">${group}</span><div class="reason-chip-list">${REASONS.filter(x=>x[2]===group).map(x=>`<label class="reason-chip ${(v.reasons||[]).includes(x[0])?'selected':''}"><input class="eval-reason" type="checkbox" value="${x[0]}" ${(v.reasons||[]).includes(x[0])?'checked':''}><span>${esc(x[1])}</span></label>`).join('')}</div></div>`).join('')}</div></div><div class="detail-section"><h4>Descritores de aprendizagem</h4><div class="reason-chip-list descriptors">${descriptorOptions(subject,v.descriptors)}</div></div><label class="field detail-section"><span>Observação individual</span><textarea class="eval-observation" rows="3" placeholder="Registro objetivo do professor…">${esc(v.observation||'')}</textarea></label><div class="report-actions">${grade!==''&&Number(grade)<6?`<button class="btn btn-secondary" type="button" data-low-report="${s.id}">Parecer de baixo rendimento</button>`:''}${Number($('#evaluationTerm').value)===3?`<button class="btn btn-secondary" type="button" data-final-report="${s.id}">Relatório final do ano</button>`:''}</div></div></article>`}).join('')||'<div class="empty-state">Não há estudantes nesta turma.</div>';
  }
  function setStudentStatus(studentId,status) { const key=evalKey();state.evaluations[key]||={};state.evaluations[key][studentId]={...(state.evaluations[key][studentId]||{}),status};saveState();renderEvaluationRows(); }
  function saveEvaluation() { const key=evalKey();state.evaluations[key]||={};$$('[data-eval-row]').forEach(row=>{const id=row.dataset.evalRow,grade=row.querySelector('.eval-grade').value,status=row.querySelector('.status-segment.active')?.dataset.setStatus||'VAZIO';state.evaluations[key][id]={grade:grade===''?'':Math.max(0,Math.min(10,Number(grade))),status,reasons:Array.from(row.querySelectorAll('.eval-reason:checked')).map(x=>x.value),descriptors:Array.from(row.querySelectorAll('.descriptor input:checked')).map(x=>x.value),observation:row.querySelector('.eval-observation').value.trim()};});saveState();renderCouncilSummary();setNote('#evaluationFeedback','Notas e avaliações salvas neste navegador.','success');showToast('Avaliação trimestral salva.'); }
  function applyEmptyStatus() { const status=$('#bulkStatus').value;if(!status)return;const key=evalKey();state.evaluations[key]||={};state.students.filter(s=>s.classId===$('#evaluationClass').value).forEach(s=>{const r=state.evaluations[key][s.id]||{};if(!r.status||r.status==='VAZIO')state.evaluations[key][s.id]={...r,status};});saveState();renderEvaluationRows(); }
  function renderCouncilSummary() {
    const c=classById($('#evaluationClass').value),term=$('#evaluationTerm').value,students=state.students.filter(s=>s.classId===c?.id),records=[];
    (c?.subjects||[]).forEach(subject=>Object.entries(state.evaluations[`${c.id}|${subject}|${term}`]||{}).forEach(([studentId,v])=>records.push({subject,studentId,...v})));
    const grades=records.filter(x=>x.grade!==''&&x.grade!=null).map(x=>Number(x.grade)).filter(Number.isFinite),avg=grades.length?grades.reduce((a,b)=>a+b,0)/grades.length:null,expected=students.length*(c?.subjects?.length||0),filled=records.filter(x=>x.status&&x.status!=='VAZIO').length;
    const counts={APRENDIZAGEM_ADEQUADA:0,EM_DESENVOLVIMENTO:0,APRENDIZAGEM_INSUFICIENTE:0};records.forEach(x=>{if(counts[x.status]!=null)counts[x.status]++});
    $('#councilMetrics').innerHTML=[['Avaliações',`${filled}/${expected}`,'Registros preenchidos'],['Média geral',avg==null?'—':avg.toFixed(2),'Notas disponíveis'],['Em atenção',new Set(records.filter(x=>x.status==='APRENDIZAGEM_INSUFICIENTE').map(x=>x.studentId)).size,'Estudantes'],['Disciplinas',c?.subjects?.length||0,'Matriz da turma']].map(x=>`<div class="metric"><div class="metric-label">${x[0]}</div><div class="metric-value">${x[1]}</div><div class="metric-foot">${x[2]}</div></div>`).join('');
    const total=Math.max(1,Object.values(counts).reduce((a,b)=>a+b,0));$('#statusSummary').innerHTML=Object.entries(counts).map(([k,v])=>`<div class="summary-bar"><div><span>${STATUS_LABEL[k]}</span><b>${v}</b></div><i><span class="bar-${k}" style="width:${100*v/total}%"></span></i></div>`).join('');
    const previous=Number(term)>1?Number(term)-1:null;let up=0,down=0,same=0;if(previous){const order={APRENDIZAGEM_INSUFICIENTE:1,EM_DESENVOLVIMENTO:2,APRENDIZAGEM_ADEQUADA:3};records.forEach(r=>{const p=state.evaluations[`${c.id}|${r.subject}|${previous}`]?.[r.studentId];if(!p||!order[p.status]||!order[r.status])return;if(order[r.status]>order[p.status])up++;else if(order[r.status]<order[p.status])down++;else same++;});}$('#evolutionSummary').innerHTML=previous?`<div class="evolution-cards"><div class="evolution-up"><strong>↑ ${up}</strong><span>Evolução</span></div><div><strong>→ ${same}</strong><span>Manutenção</span></div><div class="evolution-down"><strong>↓ ${down}</strong><span>Piora</span></div></div>`:'<div class="empty-state">O primeiro trimestre ainda não possui período anterior para comparação.</div>';
    const risk={};records.filter(x=>x.status==='APRENDIZAGEM_INSUFICIENTE').forEach(x=>{risk[x.studentId]||=[];risk[x.studentId].push(x.subject)});$('#riskStudents').innerHTML=Object.entries(risk).map(([id,subjects])=>`<button class="summary-person" data-student="${id}"><span><strong>${esc(studentById(id)?.name)}</strong><small>${esc(subjects.join(', '))}</small></span><b>${subjects.length}</b></button>`).join('')||'<div class="empty-state">Nenhum estudante em atenção.</div>';
    const highlight=students.map(s=>{const rs=records.filter(x=>x.studentId===s.id&&x.grade!==''&&x.grade!=null&&Number.isFinite(Number(x.grade)));return {s,rs,avg:rs.length?rs.reduce((a,b)=>a+Number(b.grade),0)/rs.length:0}}).filter(x=>x.rs.length&&(x.rs.every(r=>Number(r.grade)>=8))).sort((a,b)=>b.avg-a.avg);$('#highlightStudents').innerHTML=highlight.map(x=>`<button class="summary-person" data-student="${x.s.id}"><span><strong>${esc(x.s.name)}</strong><small>Média ${x.avg.toFixed(1)} · elegível academicamente</small></span><b>★</b></button>`).join('')||'<div class="empty-state">Nenhum estudante atende ao critério de notas ≥ 8.</div>';
    $('#subjectPerformance').innerHTML=(c?.subjects||[]).map(subject=>{const rs=records.filter(x=>x.subject===subject&&x.grade!==''&&x.grade!=null&&Number.isFinite(Number(x.grade))),a=rs.length?rs.reduce((sum,x)=>sum+Number(x.grade),0)/rs.length:null,low=rs.filter(x=>Number(x.grade)<6).length,mid=rs.filter(x=>Number(x.grade)>=6&&Number(x.grade)<8).length,high=rs.filter(x=>Number(x.grade)>=8).length;return `<div class="subject-performance-row"><div><strong>${esc(subject)}</strong><small>${rs.length} nota(s)</small></div><b>${a==null?'—':a.toFixed(1)}</b><div class="performance-parts"><span class="low" style="width:${rs.length?100*low/rs.length:0}%"></span><span class="mid" style="width:${rs.length?100*mid/rs.length:0}%"></span><span class="high" style="width:${rs.length?100*high/rs.length:0}%"></span></div><small>&lt;6: ${low} · 6–7,9: ${mid} · ≥8: ${high}</small></div>`}).join('');
  }
  function openLowReport(studentId) { const s=studentById(studentId),subject=$('#evaluationSubject').value,r=state.evaluations[evalKey()]?.[studentId]||{},labels=REASONS.filter(x=>(r.reasons||[]).includes(x[0])).map(x=>x[1]);const win=window.open('','_blank');win.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>Parecer demonstrativo</title><style>body{font:14px Arial;margin:36px;color:#162534}h1{text-align:center;font-size:20px}.box{border:1px solid #bbb;padding:12px;margin:10px 0;white-space:pre-wrap}button{margin-top:20px}@media print{button{display:none}}</style></head><body><h1>Parecer descritivo de baixo rendimento</h1><p><b>Estudante:</b> ${esc(s.name)} &nbsp; <b>Turma:</b> ${esc(className(s.classId))}</p><p><b>Disciplina:</b> ${esc(subject)} &nbsp; <b>Trimestre:</b> ${esc($('#evaluationTerm').value)}º &nbsp; <b>Nota:</b> ${esc(r.grade)}</p><h3>Situação</h3><div class="box">${esc(STATUS_LABEL[r.status]||'Não informada')}</div><h3>Motivos relacionados</h3><div class="box">${esc(labels.join('; ')||'Não informados.')}</div><h3>Registro do professor</h3><div class="box">${esc(r.observation||'Não informado.')}</div><h3>Encaminhamentos</h3><div class="box" contenteditable="true">Clique aqui para complementar antes de imprimir.</div><button onclick="print()">Imprimir / PDF</button></body></html>`);win.document.close(); }
  function openFinalReport(studentId) { const s=studentById(studentId),subject=$('#evaluationSubject').value,blocks=TERMS.map(term=>{const r=state.evaluations[`${s.classId}|${subject}|${term}`]?.[studentId]||{};const reasons=REASONS.filter(x=>(r.reasons||[]).includes(x[0])).map(x=>x[1]).join('; ')||'Não informados.';return `<h3>${term}º trimestre — Nota ${r.grade===''||r.grade==null?'—':esc(r.grade)} — ${esc(STATUS_LABEL[r.status]||'Sem avaliação')}</h3><div class="box"><b>Motivos:</b> ${esc(reasons)}<br><b>Registro:</b> ${esc(r.observation||'Não informado.')}</div>`}).join('');const win=window.open('','_blank');win.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>Relatório final demonstrativo</title><style>body{font:14px Arial;margin:36px;color:#162534}h1{text-align:center;font-size:20px}.box{border:1px solid #bbb;padding:12px;margin:10px 0;line-height:1.6}button{margin-top:20px}@media print{button{display:none}}</style></head><body><h1>Ficha de análise e encaminhamento — Conselho de Classe</h1><p><b>Estudante:</b> ${esc(s.name)} &nbsp; <b>Turma:</b> ${esc(className(s.classId))}</p><p><b>Disciplina:</b> ${esc(subject)} &nbsp; <b>Ano letivo:</b> ${state.schoolYear}</p>${blocks}<h3>Análise final e encaminhamentos</h3><div class="box" contenteditable="true">Clique aqui para completar a análise final antes de imprimir.</div><h3>Decisão do Conselho</h3><div class="box" contenteditable="true">Registrar a decisão do Conselho de Classe.</div><button onclick="print()">Imprimir / PDF</button></body></html>`);win.document.close(); }
  async function importGradeFile(file) { if(!file)return;try{if(typeof XLSX==='undefined')throw new Error('Leitor de planilhas indisponível.');const data=await file.arrayBuffer(),book=XLSX.read(data),rows=XLSX.utils.sheet_to_json(book.Sheets[book.SheetNames[0]],{defval:''}),key=evalKey(),valid=[];let missing=0;rows.forEach(row=>{const ra=String(row['RA/CGM']||row.RA||row.CGM||'').replace(/\D/g,''),raw=row.NOTA??row.Nota??row.MEDIA??row.MÉDIA,grade=Number(String(raw).replace(',','.')),student=state.students.find(s=>s.classId===$('#evaluationClass').value&&String(s.ra).replace(/\D/g,'')===ra);if(student&&Number.isFinite(grade)&&grade>=0&&grade<=10)valid.push({student,grade});else missing++;});if(!valid.length)throw new Error('Nenhuma nota válida foi localizada para a turma selecionada.');const preview=valid.slice(0,8).map(x=>`${x.student.name}: ${x.grade.toFixed(1)}`).join('\n');if(!confirm(`Prévia da importação\n\n${preview}${valid.length>8?'\n…':''}\n\n${valid.length} nota(s) válida(s) e ${missing} linha(s) não aproveitada(s). Confirmar?`))return;state.evaluations[key]||={};valid.forEach(x=>state.evaluations[key][x.student.id]={...(state.evaluations[key][x.student.id]||{}),grade:x.grade});saveState();renderEvaluationRows();setNote('#evaluationFeedback',`${valid.length} nota(s) importada(s); ${missing} linha(s) não aproveitada(s).`,'success');}catch(e){setNote('#evaluationFeedback',e.message||String(e),'error');}finally{$('#gradeFile').value='';} }

  function renderClasses() { $('#classCards').innerHTML=state.classes.map(c=>`<button class="class-card ${c.id===selectedClassId?'active':''}" data-class-card="${c.id}"><h3>${esc(c.name)}</h3><p>${esc(c.shift)} · ${esc(c.course)}</p><p>${state.students.filter(s=>s.classId===c.id).length} estudantes</p><b>abrir →</b></button>`).join(''); renderClassStudents(); }
  function renderClassStudents() { const c=classById(selectedClassId); if (!c) { $('#classStudentsTitle').textContent='Selecione uma turma'; $('#classStudentsSubtitle').textContent='A lista aparecerá aqui.'; $('#classStudents').innerHTML='<div class="empty-state">Escolha uma turma à esquerda.</div>'; return; } const list=state.students.filter(s=>s.classId===c.id); $('#classStudentsTitle').textContent=`Estudantes · ${c.name}`; $('#classStudentsSubtitle').textContent=`${c.shift} · ${c.course} · ${list.length} estudantes`; $('#classStudents').innerHTML=`<div class="simple-list">${list.map(s=>`<div class="simple-student"><div><button data-student="${s.id}">${esc(s.name)}</button><small>RA/CGM ${esc(s.ra)}</small></div><span class="status-pill ${s.status==='ATIVO'?'status-active':'status-transferred'}">${esc(s.status)}</span></div>`).join('')}</div>`; }
  function renderTeachers() { $('#teachersTable').innerHTML=state.teachers.map(t=>`<tr><td><strong>${esc(t.name)}</strong></td><td>${esc(t.email)}</td><td>${esc(t.subjects)}</td><td><span class="status-pill ${t.status==='ATIVO'?'status-active':'status-transferred'}">${t.status}</span></td></tr>`).join(''); }
  function renderSubjects() { const all=[...new Set(state.classes.flatMap(c=>c.subjects))].sort((a,b)=>a.localeCompare(b)); $('#subjectCatalog').innerHTML=all.map(s=>`<span class="tag">${esc(s)}</span>`).join(''); fillClassSelect($('#subjectClassFilter')); const c=classById($('#subjectClassFilter').value); $('#classSubjects').innerHTML=(c?.subjects||[]).map(s=>`<div class="matrix-item">${esc(s)}</div>`).join(''); }
  function renderUsers() { $('#usersTable').innerHTML=state.users.map(u=>`<tr><td><strong>${esc(u.name)}</strong></td><td>${esc(u.login)}</td><td><span class="tag">${esc(u.profile)}</span></td><td><span class="status-pill ${u.status==='ATIVO'?'status-active':'status-transferred'}">${esc(u.status)}</span></td><td>${esc(u.last)}</td></tr>`).join(''); }

  function demoAction(type) { const messages={importar:'Na versão demonstrativa, a importação .XLS é apenas simulada.', 'novo-aluno':'O formulário de novo estudante será conectado ao banco na versão principal.', 'nova-turma':'O cadastro de turma será conectado ao banco na versão principal.', 'novo-professor':'O cadastro de professor será conectado ao banco na versão principal.', 'nova-disciplina':'O catálogo é demonstrativo nesta versão.', 'novo-usuario':'O gerenciamento de usuários será conectado à autenticação na versão principal.', 'prof-atendimento':'O formulário de atendimento a professores será incluído na próxima etapa.', ocorrencia:'A nova ocorrência seria registrada na ficha do estudante.', 'busca-ativa':'O contato de busca ativa seria registrado no histórico.'}; showToast(messages[type] || 'Funcionalidade demonstrativa.'); }
  function closeMobileMenu() { $('#sidebar').classList.remove('open'); $('#sidebarBackdrop').classList.remove('open'); }
  function bindEvents() {
    $$('.nav-item').forEach(btn=>btn.addEventListener('click',()=>navigate(btn.dataset.page)));
    $('#menuSearch').addEventListener('input',e=>{const term=e.target.value.toLowerCase().trim();let visible=0;$$('.nav-section').forEach(section=>{let sectionVisible=0;section.querySelectorAll('.nav-item').forEach(item=>{const ok=!term || `${item.textContent} ${item.dataset.search}`.toLowerCase().includes(term);item.style.display=ok?'flex':'none';if(ok)sectionVisible++;});section.style.display=sectionVisible?'grid':'none';visible+=sectionVisible;});$('#navEmpty').style.display=visible?'none':'block';});
    $('#btnCollapse').addEventListener('click',()=>$('#appShell').classList.toggle('sidebar-collapsed'));
    $('#btnMobile').addEventListener('click',()=>{$('#sidebar').classList.add('open');$('#sidebarBackdrop').classList.add('open')}); $('#sidebarBackdrop').addEventListener('click',closeMobileMenu);
    document.addEventListener('click',e=>{const go=e.target.closest('[data-go]');if(go){navigate(go.dataset.go);return}const student=e.target.closest('[data-student]');if(student){openStudent(student.dataset.student);return}const classCard=e.target.closest('[data-class-card]');if(classCard){selectedClassId=classCard.dataset.classCard;renderClasses();return}const action=e.target.closest('[data-demo-action]');if(action){demoAction(action.dataset.demoAction);return}const tab=e.target.closest('[data-council-tab]');if(tab){setCouncilTab(tab.dataset.councilTab);return}const profile=e.target.closest('[data-profile-subject]');if(profile){profileSubject=profile.dataset.profileSubject;renderProfileSubjectList();renderProfileEditor();return}const profileChoice=e.target.closest('[data-profile-choice]');if(profileChoice){toggleProfileChoice(profileChoice.dataset.profileChoice);return}const pedagogyChoice=e.target.closest('[data-pedagogy-choice]');if(pedagogyChoice){togglePedagogyChoice(pedagogyChoice.dataset.pedagogyChoice);return}const status=e.target.closest('[data-set-status]');if(status){saveEvaluation();setStudentStatus(status.dataset.studentId,status.dataset.setStatus);return}const detail=e.target.closest('[data-toggle-eval]');if(detail){$(`#eval-detail-${detail.dataset.toggleEval}`).classList.toggle('hidden');return}const report=e.target.closest('[data-low-report]');if(report){saveEvaluation();openLowReport(report.dataset.lowReport);return}const finalReport=e.target.closest('[data-final-report]');if(finalReport){saveEvaluation();openFinalReport(finalReport.dataset.finalReport);return}});
    $('#studentSearch').addEventListener('input',renderStudentSearch); $('#studentClassFilter').addEventListener('change',renderStudentSearch); $('#clearStudentSearch').addEventListener('click',()=>{$('#studentSearch').value='';$('#studentClassFilter').value='';selectedStudentId=null;$('#studentProfile').classList.add('hidden');renderStudentSearch()});
    $('#attendanceClass').addEventListener('change',updateAttendanceStudents); $('#attendanceForm').addEventListener('submit',saveAttendance);
    $('#toggleTeacherAttendance').addEventListener('click',()=>$('#teacherAttendanceCard').classList.remove('hidden'));$('#closeTeacherAttendance').addEventListener('click',()=>$('#teacherAttendanceCard').classList.add('hidden'));$('#teacherAttendanceForm').addEventListener('submit',saveTeacherAttendance);$('#teacherAttendanceFilter').addEventListener('change',renderProfessionalAttendance);
    $('#evaluationClass').addEventListener('change',()=>{updateEvaluationSubjects();renderEvaluation()}); $('#evaluationSubject').addEventListener('change',()=>{renderEvaluationRows();renderCouncilSummary()}); $('#evaluationTerm').addEventListener('change',renderEvaluation); $('#saveEvaluation').addEventListener('click',saveEvaluation); $('#saveClassProfile').addEventListener('click',saveClassProfile);$('#saveCollective').addEventListener('click',saveCollective);$('#savePedagogy').addEventListener('click',savePedagogy);$('#applyEmptyStatus').addEventListener('click',applyEmptyStatus);$('#importGrades').addEventListener('click',()=>$('#gradeFile').click());$('#gradeFile').addEventListener('change',e=>importGradeFile(e.target.files[0]));$('#printCouncilReport').addEventListener('click',()=>window.print());$('#resetEvaluation').addEventListener('click',()=>{if(!confirm('Restaurar os dados demonstrativos do pré-conselho?'))return;state.evaluations=clone(DEMO.evaluations);state.classProfiles=clone(DEMO.classProfiles);state.councils={};state.pedagogyAssessments={};saveState();renderEvaluation();showToast('Dados demonstrativos restaurados.')}); $('#subjectClassFilter').addEventListener('change',renderSubjects);
    document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMobileMenu()});
  }
  bindEvents(); renderDashboard(); renderStudentSearch();
})();

(() => {
  'use strict';

  const STORAGE_KEY = 'acompanhamento-escolar-demo-v1';
  const TERMS = ['1', '2', '3'];
  const STATUS_CYCLE = ['VAZIO', 'APRENDIZAGEM', 'SEM-APRENDIZAGEM', 'AVANCO', 'ESTAGNACAO', 'RETROCESSO'];
  const STATUS_LABEL = {
    VAZIO: 'Selecionar status',
    APRENDIZAGEM: 'Aprendizagem',
    'SEM-APRENDIZAGEM': 'Sem aprendizagem',
    AVANCO: 'Avanço',
    ESTAGNACAO: 'Estagnação',
    RETROCESSO: 'Retrocesso'
  };
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
      { id: 'al-001', name: 'Alice Mendonça Król', ra: '1014092915', classId: '3A', status: 'ATIVO', birth: '14/03/2009', responsibles: 'Mariana Król', phone: '(43) 99150-3622', email: 'alice.demonstracao@example.com', labels: ['SRM'], profile: { difficulties: 'Apresenta dificuldade pontual em organização de estudos.', srm: 'Não', report: 'Sim', reportDetails: 'Laudo demonstrativo cadastrado.', family: 'Acompanhamento familiar regular.', observations: 'Exemplo de ficha para apresentação.' } },
      { id: 'al-002', name: 'Ana Karolina de Moura Bilro', ra: '1016806222', classId: '3A', status: 'ATIVO', birth: '22/07/2009', responsibles: 'Carlos Bilro', phone: '(43) 98800-1122', email: 'ana.demonstracao@example.com', labels: [], profile: { difficulties: 'Sem registro no momento.', srm: 'Não', report: 'Não', reportDetails: '', family: 'Contato realizado no início do ano.', observations: '' } },
      { id: 'al-003', name: 'Beatriz Lemos do Nascimento', ra: '1017115673', classId: '3A', status: 'ATIVO', birth: '08/11/2009', responsibles: 'Juliana Lemos', phone: '(43) 98761-4421', email: 'beatriz.demonstracao@example.com', labels: [], profile: { difficulties: 'Acompanhamento de leitura e produção textual.', srm: 'Não', report: 'Não', reportDetails: '', family: 'Aguardando reunião.', observations: '' } },
      { id: 'al-004', name: 'Cauã Vinicius de Souza Fontana', ra: '1022124435', classId: '3B', status: 'ATIVO', birth: '19/01/2009', responsibles: 'Rafael Fontana', phone: '(43) 99614-2050', email: 'caua.demonstracao@example.com', labels: ['ACOMPANHAMENTO'], profile: { difficulties: 'Necessita acompanhamento de frequência e rotina.', srm: 'Não', report: 'Não', reportDetails: '', family: 'Responsável contatado.', observations: 'Registro demonstrativo.' } },
      { id: 'al-005', name: 'Érico da Rosa Hellmann', ra: '1013531150', classId: '3B', status: 'ATIVO', birth: '02/05/2009', responsibles: 'Luciana Hellmann', phone: '(43) 99113-7311', email: 'erico.demonstracao@example.com', labels: [], profile: { difficulties: 'Sem dificuldades registradas.', srm: 'Não', report: 'Não', reportDetails: '', family: 'Acompanhamento regular.', observations: '' } },
      { id: 'al-006', name: 'Gabriela Oliveira Mendonça', ra: '1009395853', classId: '2D', status: 'ATIVO', birth: '28/09/2008', responsibles: 'Patrícia Oliveira', phone: '(43) 99810-3452', email: 'gabriela.demonstracao@example.com', labels: ['LAUDO'], profile: { difficulties: 'Dificuldade de atenção em atividades extensas.', srm: 'Sim', report: 'Sim', reportDetails: 'Laudo demonstrativo para teste do painel.', family: 'Reunião realizada no trimestre anterior.', observations: '' } },
      { id: 'al-007', name: 'José Ferreira', ra: '1024500001', classId: '9A', status: 'ATIVO', birth: '17/06/2011', responsibles: 'André Ferreira', phone: '(43) 98840-5511', email: 'jose.demonstracao@example.com', labels: [], profile: { difficulties: 'Acompanhamento de frequência.', srm: 'Não', report: 'Não', reportDetails: '', family: 'Contato pendente.', observations: '' } }
    ],
    teachers: [
      { id: 'p-1', name: 'Ana Paula Ribeiro', email: 'ana.ribeiro@escola.pr.gov.br', subjects: 'Língua Portuguesa, Redação', status: 'ATIVO' },
      { id: 'p-2', name: 'Henrique Martins', email: 'henrique.martins@escola.pr.gov.br', subjects: 'Programação, Banco de Dados', status: 'ATIVO' },
      { id: 'p-3', name: 'Cristiane Souza', email: 'cristiane.souza@escola.pr.gov.br', subjects: 'Língua Inglesa', status: 'ATIVO' },
      { id: 'p-4', name: 'Newton Almeida', email: 'newton.almeida@escola.pr.gov.br', subjects: 'História, Sociologia', status: 'INATIVO' }
    ],
    users: [
      { name: 'Administrador demonstrativo', login: 'admin', profile: 'ADMINISTRADOR', status: 'ATIVO', last: 'Agora' },
      { name: 'Ana Paula Ribeiro', login: 'ana.ribeiro', profile: 'DOCENTE', status: 'ATIVO', last: 'Hoje, 10:22' },
      { name: 'Equipe pedagógica', login: 'pedagogia', profile: 'PEDAGOGIA', status: 'ATIVO', last: 'Ontem, 16:18' }
    ],
    attendances: [
      { id: 'at-1', date: '08/08/2026', studentId: 'al-001', sector: 'PEDAGOGIA', type: 'Acompanhamento', description: 'Reunião de acompanhamento da aprendizagem.', action: 'Retomar contato no próximo conselho.', owner: 'Equipe pedagógica', status: 'Em acompanhamento' },
      { id: 'at-2', date: '06/08/2026', studentId: 'al-006', sector: 'MILITAR', type: 'Frequência', description: 'Conversa sobre faltas recorrentes.', action: 'Contato com responsável.', owner: 'Corpo cívico-militar', status: 'Registrado' },
      { id: 'at-3', date: '04/08/2026', studentId: 'al-004', sector: 'DOCENTE', type: 'Acolhimento', description: 'Atendimento solicitado pelo professor.', action: 'Encaminhado à pedagogia.', owner: 'Prof. Henrique', status: 'Concluído' }
    ],
    occurrences: [
      { date: '07/08/2026', studentId: 'al-004', fact: 'Uso inadequado de aparelho durante a aula.', status: 'Em acompanhamento' },
      { date: '31/07/2026', studentId: 'al-007', fact: 'Conflito verbal entre estudantes.', status: 'Registrado' }
    ],
    activeSearch: [
      { studentId: 'al-007', reason: 'Frequência abaixo do esperado', lastContact: 'Ainda não realizado', status: 'Pendente' },
      { studentId: 'al-004', reason: 'Ausências consecutivas', lastContact: '05/08/2026', status: 'Em acompanhamento' }
    ],
    evaluations: {},
    classProfiles: {}
  };

  let state = loadState();
  let currentPage = 'dashboard';
  let selectedStudentId = null;
  let selectedClassId = state.classes[0]?.id || '';
  let profileTab = 'dados';

  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (!saved || !Array.isArray(saved.students)) return clone(DEMO);
      return { ...clone(DEMO), ...saved };
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
      ['Estudantes com laudo', state.students.filter(s => s.profile.report === 'Sim').length, 'Atenção individual', 'orange'],
      ['Atendimentos recentes', state.attendances.length, 'Registros locais', 'red']
    ];
    $('#dashboardMetrics').innerHTML = metrics.map(m => `<div class="metric"><div class="metric-label">${m[0]}</div><div class="metric-value">${m[1]}</div><div class="metric-foot"><span class="dot ${m[3]}"></span>${m[2]}</div></div>`).join('');
    $('#recentList').innerHTML = state.attendances.slice().reverse().slice(0,5).map(a => { const s = studentById(a.studentId); return `<div class="recent-row clickable" data-student="${s.id}"><span class="recent-date">${esc(a.date)}</span><div class="recent-main"><strong>${esc(s.name)}</strong><span>${esc(a.sector)} · ${esc(a.type)} · ${esc(className(s.classId))}</span></div><span class="status-pill ${a.status === 'Concluído' ? 'status-active' : 'status-pending'}">${esc(a.status)}</span></div>`; }).join('') || '<div class="empty-state">Nenhum atendimento registrado.</div>';
    $('#laudoList').innerHTML = state.students.filter(s => s.profile.report === 'Sim').map(s => `<div class="laudo-row clickable" data-student="${s.id}"><span class="laudo-avatar">${initials(s.name)}</span><div class="laudo-main"><strong>${esc(s.name)}</strong><span>${esc(className(s.classId))} · RA/CGM ${esc(s.ra)}</span></div><span class="status-pill status-pending">LAUDO</span></div>`).join('') || '<div class="empty-state">Nenhum estudante marcado.</div>';
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
    const s = studentById(id); if (!s) return; const records = state.attendances.filter(a => a.studentId === id).reverse();
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

  function renderProfessionalAttendance() { $('#profAttendanceTable').innerHTML = [{date:'08/08/2026',teacher:'Ana Paula Ribeiro',subject:'Planejamento de recuperação',status:'Em acompanhamento'},{date:'02/08/2026',teacher:'Henrique Martins',subject:'Acompanhamento de turma',status:'Concluído'},{date:'29/07/2026',teacher:'Cristiane Souza',subject:'Estratégias de participação',status:'Registrado'}].map(x => `<tr><td>${x.date}</td><td><strong>${x.teacher}</strong></td><td>${x.subject}</td><td><span class="status-pill ${x.status === 'Concluído' ? 'status-active' : 'status-pending'}">${x.status}</span></td></tr>`).join(''); }
  function renderOccurrences() { $('#occurrenceTable').innerHTML = state.occurrences.map(x => { const s=studentById(x.studentId); return `<tr><td>${x.date}</td><td><strong>${esc(s.name)}</strong><small class="muted">${esc(className(s.classId))}</small></td><td>${esc(x.fact)}</td><td><span class="status-pill ${x.status === 'Registrado' ? 'status-pending' : 'status-active'}">${esc(x.status)}</span></td></tr>`; }).join(''); }
  function renderActiveSearch() { const pending=state.activeSearch.filter(x=>x.status==='Pendente').length; const acompanhamento=state.activeSearch.filter(x=>x.status==='Em acompanhamento').length; $('#activeSearchStats').innerHTML = [['Pendências',pending,'red'],['Em acompanhamento',acompanhamento,'orange'],['Contatos registrados',state.activeSearch.length-acompanhamento-pending,'green']].map(x=>`<div class="stat"><label>${x[0]}</label><strong>${x[1]}</strong><span class="metric-foot"><span class="dot ${x[2]}"></span>Dados demonstrativos</span></div>`).join(''); $('#activeSearchTable').innerHTML=state.activeSearch.map(x=>{const s=studentById(x.studentId);return `<tr><td><strong>${esc(s.name)}</strong></td><td>${esc(className(s.classId))}</td><td>${esc(x.reason)}</td><td>${esc(x.lastContact)}</td><td><span class="status-pill ${x.status==='Pendente'?'status-danger':'status-pending'}">${esc(x.status)}</span></td></tr>`}).join(''); }

  function evalKey() { return `${$('#evaluationClass').value}|${$('#evaluationSubject').value}|${$('#evaluationTerm').value}`; }
  function renderEvaluation() { fillClassSelect($('#evaluationClass')); updateEvaluationSubjects(); const c=classById($('#evaluationClass').value); $('#evaluationHeading').textContent=`Estudantes · ${c?.name || ''}`; $('#evaluationHint').textContent=`${$('#evaluationSubject').value || 'Selecione uma disciplina'} · ${$('#evaluationTerm').value}º trimestre`; $('#classProfile').value=state.classProfiles[c?.id] || 'Turma participativa e produtiva'; renderEvaluationRows(); }
  function updateEvaluationSubjects() { const c=classById($('#evaluationClass').value); const previous=$('#evaluationSubject').value; $('#evaluationSubject').innerHTML=(c?.subjects || []).map(s=>`<option value="${esc(s)}">${esc(s)}</option>`).join(''); if ([...$('#evaluationSubject').options].some(o=>o.value===previous)) $('#evaluationSubject').value=previous; }
  function renderEvaluationRows() { const c=$('#evaluationClass').value; const list=state.students.filter(s=>s.classId===c); const key=evalKey(); const values=state.evaluations[key] || {}; $('#evaluationTable').innerHTML=`<div class="evaluation-row header"><div>Estudante</div><div>Aprendizagem</div><div>Observação</div></div>${list.map(s=>{const value=values[s.id]?.status || 'VAZIO';const obs=values[s.id]?.observation || '';return `<div class="evaluation-row"><div class="evaluation-student"><strong>${esc(s.name)}</strong><span>RA/CGM ${esc(s.ra)}</span></div><button class="status-cycle pc-${value}" data-eval-student="${s.id}" type="button">${STATUS_LABEL[value]}</button><input class="eval-observation" data-observation-student="${s.id}" value="${esc(obs)}" placeholder="Observação individual…"></div>`}).join('') || '<div class="empty-state">Não há estudantes nesta turma.</div>'}`; }
  function cycleEvaluation(studentId) { const key=evalKey(); state.evaluations[key] ||= {}; const current=state.evaluations[key][studentId]?.status || 'VAZIO'; const next=STATUS_CYCLE[(STATUS_CYCLE.indexOf(current)+1)%STATUS_CYCLE.length]; state.evaluations[key][studentId]={...(state.evaluations[key][studentId]||{}),status:next}; saveState(); renderEvaluationRows(); }
  function saveEvaluation() { const key=evalKey(); state.evaluations[key] ||= {}; $$('.eval-observation').forEach(input=>{state.evaluations[key][input.dataset.observationStudent] ||= {status:'VAZIO'};state.evaluations[key][input.dataset.observationStudent].observation=input.value.trim();}); const classId=$('#evaluationClass').value; state.classProfiles[classId]=$('#classProfile').value; saveState(); setNote('#evaluationFeedback','Avaliação salva localmente nesta demonstração.','success'); showToast('Avaliação trimestral salva.'); }

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
    document.addEventListener('click',e=>{const go=e.target.closest('[data-go]');if(go){navigate(go.dataset.go);return}const student=e.target.closest('[data-student]');if(student){openStudent(student.dataset.student);return}const classCard=e.target.closest('[data-class-card]');if(classCard){selectedClassId=classCard.dataset.classCard;renderClasses();return}const action=e.target.closest('[data-demo-action]');if(action){demoAction(action.dataset.demoAction);return}const evalBtn=e.target.closest('[data-eval-student]');if(evalBtn){cycleEvaluation(evalBtn.dataset.evalStudent);return}});
    $('#studentSearch').addEventListener('input',renderStudentSearch); $('#studentClassFilter').addEventListener('change',renderStudentSearch); $('#clearStudentSearch').addEventListener('click',()=>{$('#studentSearch').value='';$('#studentClassFilter').value='';selectedStudentId=null;$('#studentProfile').classList.add('hidden');renderStudentSearch()});
    $('#attendanceClass').addEventListener('change',updateAttendanceStudents); $('#attendanceForm').addEventListener('submit',saveAttendance);
    $('#evaluationClass').addEventListener('change',()=>{updateEvaluationSubjects();renderEvaluation()}); $('#evaluationSubject').addEventListener('change',renderEvaluationRows); $('#evaluationTerm').addEventListener('change',renderEvaluationRows); $('#classProfile').addEventListener('change',()=>{}); $('#saveEvaluation').addEventListener('click',saveEvaluation); $('#resetEvaluation').addEventListener('click',()=>{state.evaluations={};saveState();renderEvaluation();showToast('Avaliações demonstrativas limpas.')}); $('#subjectClassFilter').addEventListener('change',renderSubjects);
    document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMobileMenu()});
  }
  bindEvents(); renderDashboard(); renderStudentSearch();
})();

#!/usr/bin/env python3
"""Animated diagrams for the work pages other than My Lab: public/works/<slug>-<lang>.svg
(JQCD, Virtual Links, DevOps System). Drawn from the pages' own descriptions. Icons: simple-icons (CC0) + a few generic glyphs."""
import json, os
from xml.sax.saxutils import escape
HERE=os.path.dirname(os.path.abspath(__file__)); OUT=os.path.join(HERE,'..','public','works')
ICON=json.load(open(os.path.join(HERE,'lab-icons.json')))
CYCLE=12.0
FONT={'en':'Helvetica, Arial, sans-serif','fr':'Helvetica, Arial, sans-serif','ar':"'Segoe UI','Noto Sans Arabic',Tahoma,Arial,sans-serif"}
G={ # generic 24x24 glyphs, stroke style
 'db':'<path d="M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
 'gear':'<circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1"/>',
 'chart':'<path d="M4 20h16M6.5 20v-7M12 20V5M17.5 20v-10"/>',
 'doc':'<path d="M6 3h9l4 4v14H6zM15 3v4h4M9 12h7M9 16h7"/>',
 'graph':'<circle cx="6" cy="7" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="12" cy="13" r="2"/><circle cx="6" cy="19" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7.7 8l3 3.7M16.5 7.3L13.4 11.5M7 17.3l3.6-3M13.8 14.2l3.6 2.7"/>',
 'compass':'<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
 'target':'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
 'server':'<rect x="4" y="4" width="16" height="6" rx="1.5"/><rect x="4" y="14" width="16" height="6" rx="1.5"/><path d="M8 7h.01M8 17h.01"/>',
 'folder':'<path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2zM12 17v-6M9.5 13.5L12 11l2.5 2.5"/>',
 'xml':'<path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14"/>',
 'cube':'<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12L4 7.5"/>',
 'search':'<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/>',
 'route':'<circle cx="6" cy="6" r="2.2"/><circle cx="18" cy="18" r="2.2"/><path d="M8 6h6a3 3 0 010 6h-4a3 3 0 000 6h6"/>',
 'dev':'<circle cx="12" cy="8" r="3.2"/><path d="M5 20c.8-4 3.5-6 7-6s6.2 2 7 6"/>',
}
def icon(key,cx,cy,s,bg='#f1f5f9',op=1):
    i=ICON[key]; pad=s*0.2; sc=(s-2*pad)/24
    return (f'<g opacity="{op}"><rect x="{cx-s/2}" y="{cy-s/2}" width="{s}" height="{s}" rx="{s*0.22}" fill="{bg}" filter="url(#sh)"/>'
            f'<g transform="translate({cx-s/2+pad},{cy-s/2+pad}) scale({sc})"><path d="{i["d"]}" fill="#{i["hex"]}"/></g></g>')
def glyph(kind,cx,cy,s,color,op=1):
    pad=s*0.2; sc=(s-2*pad)/24
    return (f'<g opacity="{op}"><rect x="{cx-s/2}" y="{cy-s/2}" width="{s}" height="{s}" rx="{s*0.22}" fill="#f1f5f9" filter="url(#sh)"/>'
            f'<g transform="translate({cx-s/2+pad},{cy-s/2+pad}) scale({sc})" fill="none" stroke="{color}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">{G[kind]}</g></g>')
def txt(x,y,s,size=16,fill='#e2e8f0',anchor='middle',weight=500):
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{fill}" text-anchor="{anchor}" font-weight="{weight}">{escape(s)}</text>'
def t(a): return round(a/CYCLE,4)

class Diagram:
    def __init__(s,lg,head):
        s.lg=lg; s.head=head; s.defs=[]; s.back=[]; s.edges=[]; s.nodes=[]; s.n=0
    def edge(s,d,a,b,lab=None,lx=None,ly=None,anchor='middle',color='#38bdf8',dash=True,dot=True,op=1,w=2.4):
        s.n+=1; i=s.n; s.defs.append(f'<path id="p{i}" d="{d}"/>')
        s.edges.append(f'<g opacity="{op}"><use href="#p{i}" fill="none" stroke="#334155" stroke-width="{w+2}" stroke-linecap="round"/>'
          f'<use href="#p{i}" fill="none" stroke="{color}" stroke-opacity=".75" stroke-width="{w}" stroke-linecap="round" stroke-dasharray="7 7" marker-end="url(#ah)"><animate attributeName="stroke-dashoffset" from="28" to="0" dur="1.4s" repeatCount="indefinite"/></use></g>')
        if dot:
            x,y=t(a),t(b); e=min(0.012,(y-x)/4)
            s.edges.append(f'<circle r="5.5" fill="#fff" stroke="{color}" stroke-width="2.5" opacity="0"><animateMotion dur="{CYCLE}s" repeatCount="indefinite" calcMode="linear" keyPoints="0;0;1;1" keyTimes="0;{x};{y};1"><mpath href="#p{i}"/></animateMotion>'
              f'<animate attributeName="opacity" dur="{CYCLE}s" repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;{x};{round(x+e,4)};{round(y-e,4)};{y};1"/></circle>')
        if lab: s.edges.append(txt(lx,ly,lab,14.5,'#93c5fd',anchor))
    def ring(s,cx,cy,w,h,arrive,rx=22):
        a=t(arrive)
        s.back.append(f'<rect x="{cx-w/2-5}" y="{cy-h/2-5}" width="{w+10}" height="{h+10}" rx="{rx+4}" fill="none" stroke="#38bdf8" stroke-width="3" opacity="0"><animate attributeName="opacity" dur="{CYCLE}s" repeatCount="indefinite" values="0;0;1;0;0" keyTimes="0;{round(a-0.004,4)};{a};{round(a+0.07,4)};1"/></rect>')
    def node(s,svg,cx,cy,size,label,sub=None,arrive=None,op=1):
        if arrive is not None: s.ring(cx,cy,size,size,arrive)
        s.nodes.append(svg)
        s.nodes.append(txt(cx,cy+size/2+22,label,16,'#e2e8f0'))
        if sub: s.nodes.append(txt(cx,cy+size/2+42,sub,13,'#94a3b8'))
    def svg(s,h=600):
        return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 {h}" width="1280" height="{h}" xml:lang="{s.lg}" font-family="{FONT[s.lg]}">'
          f'<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a1020"/><stop offset="1" stop-color="#12203a"/></linearGradient>'
          f'<filter id="sh" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000" flood-opacity=".45"/></filter>'
          f'<marker id="ah" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M1,1 L8,4.5 L1,8 z" fill="#38bdf8"/></marker>{"".join(s.defs)}</defs>'
          f'<rect width="1280" height="{h}" fill="url(#bg)"/><rect x="20" y="20" width="1240" height="{h-40}" rx="22" fill="none" stroke="#1e3a5f" stroke-width="1.5"/>'
          f'{txt(60,56,s.head,19,"#e2e8f0","start",700)}'+''.join(s.back)+''.join(s.edges)+''.join(s.nodes)+'</svg>')

def jqcd(lg):
    T={'en':dict(h='JQCD · Vermeg · 2023',jira='Jira',jsub='client queries · 2008 → today',ext='Extraction',esub='all delivered queries',db='Central database',dsub='one place for everything',an='Cross-project analysis',rp='Reporting',x='extract',c='centralize',a='analyze',r='report'),
       'fr':dict(h='JQCD · Vermeg · 2023',jira='Jira',jsub='requêtes clients · 2008 → aujourd’hui',ext='Extraction',esub='toutes les requêtes livrées',db='Base centralisée',dsub='un seul endroit',an='Analyse inter-projets',rp='Reporting',x='extraire',c='centraliser',a='analyser',r='reporter'),
       'ar':dict(h='JQCD · Vermeg · 2023',jira='Jira',jsub='استعلامات العملاء · 2008 ← اليوم',ext='الاستخراج',esub='كل الاستعلامات المسلَّمة',db='قاعدة بيانات مركزية',dsub='مكان واحد لكل شيء',an='تحليل عبر المشاريع',rp='التقارير',x='استخراج',c='تجميع',a='تحليل',r='تقرير')}[lg]
    d=Diagram(lg,T['h'])
    d.edge('M226,300 L432,300',0.0,2.4,T['x'],330,282)
    d.edge('M528,300 L732,300',2.4,4.8,T['c'],630,282)
    d.edge('M828,282 C930,282 940,190 1034,190',4.8,7.2,T['a'],930,214,'start')
    d.edge('M828,318 C930,318 940,410 1034,410',4.8,7.2,T['r'],930,392,'start')
    d.node(icon('jira',180,300,92),180,300,92,T['jira'],T['jsub'])
    d.node(glyph('gear',480,300,92,'#0ea5e9'),480,300,92,T['ext'],T['esub'],2.4)
    d.node(glyph('db',780,300,92,'#2563eb'),780,300,92,T['db'],T['dsub'],4.8)
    d.node(glyph('chart',1080,190,84,'#16a34a'),1080,190,84,T['an'],None,7.2)
    d.node(glyph('doc',1080,410,84,'#d97706'),1080,410,84,T['rp'],None,7.2)
    return d.svg(520)
def virtual(lg):
    T={'en':dict(h='Virtual Links · Vermeg · 2023',ora='Oracle DB',orasub='no primary / foreign keys',xml='XML files',xmlsub='tables and relationships',ent='Code entities',entsub='incl. abstract classes',jira='Jira queries',jirasub='from the JQCD project',
         bat='Mapping batch',batsub='abstract class → id check',g='Entity graph',gsub='≈ 2,300 entities',lar='Laravel app (MVC)',larsub='graph as a JS relational model',se='Search',sesub='start → end entities',pa='Join paths',pasub='possible ways between them',qu='Ready query',qusub='copy and run',
         e1='read',e2='resolve',e3='map',e4='load',e5='search',e6='suggest',e7='known query → direct'),
       'fr':dict(h='Virtual Links · Vermeg · 2023',ora='Base Oracle',orasub='sans clés primaires / étrangères',xml='Fichiers XML',xmlsub='tables et relations',ent='Entités du code',entsub='dont classes abstraites',jira='Requêtes Jira',jirasub='du projet JQCD',
         bat='Batch de mapping',batsub='classe abstraite → test de l’id',g='Graphe d’entités',gsub='≈ 2 300 entités',lar='Application Laravel (MVC)',larsub='graphe en base relationnelle JS',se='Recherche',sesub='entité de départ → arrivée',pa='Chemins de jointure',pasub='les chemins possibles entre elles',qu='Requête prête',qusub='à copier et exécuter',
         e1='lire',e2='résoudre',e3='mapper',e4='charger',e5='chercher',e6='suggérer',e7='requête connue → direct'),
       'ar':dict(h='Virtual Links · Vermeg · 2023',ora='قاعدة Oracle',orasub='بلا مفاتيح أساسية / أجنبية',xml='ملفات XML',xmlsub='الجداول والعلاقات',ent='كيانات الشيفرة',entsub='ومنها الأصناف المجرّدة',jira='استعلامات Jira',jirasub='من مشروع JQCD',
         bat='Batch الربط',batsub='صنف مجرّد ← فحص المعرّف',g='مخطط الكيانات',gsub='≈ 2300 كيان',lar='تطبيق Laravel (MVC)',larsub='المخطط كقاعدة علائقية بـ JS',se='البحث',sesub='كيان البداية ← النهاية',pa='مسارات الربط',pasub='الطرق الممكنة بينها',qu='استعلام جاهز',qusub='للنسخ والتنفيذ',
         e1='قراءة',e2='حلّ',e3='ربط',e4='تحميل',e5='بحث',e6='اقتراح',e7='استعلام معروف ← مباشرة')}[lg]
    d=Diagram(lg,T['h'])
    # four sources on top converge on the mapping batch
    src=[(150,'oracle',T['ora'],T['orasub']),(380,None,T['xml'],T['xmlsub']),(610,None,T['ent'],T['entsub']),(840,'jira',T['jira'],T['jirasub'])]
    kinds=[None,'xml','cube',None]
    for k,(x,ic,lab,sub) in enumerate(src):
        d.node(icon(ic,x,112,76) if ic else glyph(kinds[k],x,112,76,'#0ea5e9' if k==1 else '#7c3aed'),x,112,76,lab,sub,0.0 if False else None)
    d.edge('M150,206 C150,260 360,250 380,286',0.0,1.6,None)
    d.edge('M380,206 L400,284',0.0,1.6,None)
    d.edge('M610,206 C610,260 470,250 440,286',0.0,1.6,None)
    d.edge('M840,206 C840,262 520,250 468,290',0.0,1.6,None)
    d.nodes.append(txt(268,246,T['e1'],14.5,'#93c5fd'))
    d.ring(420,330,88,88,1.6)
    d.nodes.append(glyph('gear',420,330,88,'#0ea5e9')); d.nodes.append(txt(420,398,T['bat'],16)); d.nodes.append(txt(420,418,T['batsub'],13,'#94a3b8'))
    d.edge('M466,330 L588,330',1.6,3.4,T['e3'],527,312)
    d.ring(634,330,88,88,3.4)
    d.nodes.append(glyph('graph',634,330,88,'#7c3aed')); d.nodes.append(txt(634,398,T['g'],16)); d.nodes.append(txt(634,418,T['gsub'],13,'#94a3b8'))
    for (px,py,dl) in [(622,308,0),(658,305,1.2),(634,330,2.4),(622,354,3.6),(662,352,4.8)]:
        d.nodes.append(f'<circle cx="{px}" cy="{py}" r="3" fill="#a78bfa" opacity="0"><animate attributeName="opacity" values="0;.9;0" dur="6s" begin="{dl}s" repeatCount="indefinite"/></circle>')
    d.edge('M680,330 L810,330',3.4,5.0,T['e4'],745,312)
    d.node(icon('laravel',856,330,92),856,330,92,T['lar'],T['larsub'],5.0)
    d.edge('M904,330 L1032,330',5.0,6.4,T['e5'],968,312)
    d.node(glyph('search',1080,330,88,'#16a34a'),1080,330,88,T['se'],T['sesub'],6.4)
    # row 3: join paths and the ready query
    d.edge('M1064,376 C1040,470 960,500 906,518',6.4,8.2,T['e6'],1010,460,'start')
    d.node(glyph('route',856,548,88,'#d97706'),856,548,88,T['pa'],T['pasub'],8.2)
    d.edge('M810,548 L688,548',8.2,9.8,None)
    d.node(glyph('doc',634,548,88,'#2563eb'),634,548,88,T['qu'],T['qusub'],9.8)
    # shortcut: a known query / saved search is offered directly
    d.edge('M1044,362 C1000,470 790,470 676,506',6.4,9.8,None,color='#4ade80',w=2.2)
    d.nodes.append(f'<text x="852" y="492" font-size="14" fill="#86efac" text-anchor="middle" font-weight="600">{escape(T["e7"])}</text>')
    return d.svg(660)
def devops(lg):
    T={'en':dict(h='DevOps System · Dewinter · 2018',before='BEFORE',after='AFTER',dev='Developer',ftp='Manual FTP',srv='Server',git='Git',jk='Jenkins',env='Servers',ftpn='slow · error-prone',m='manual upload',p='push',tr='trigger',dp='automated deploy',r1='less deployment time',r2='less human error'),
       'fr':dict(h='DevOps System · Dewinter · 2018',before='AVANT',after='APRÈS',dev='Développeur',ftp='FTP manuel',srv='Serveur',git='Git',jk='Jenkins',env='Serveurs',ftpn='lent · source d’erreurs',m='envoi manuel',p='push',tr='déclenche',dp='déploiement automatisé',r1='moins de temps de déploiement',r2='moins d’erreurs humaines'),
       'ar':dict(h='DevOps System · Dewinter · 2018',before='قبل',after='بعد',dev='المطوّر',ftp='FTP يدوي',srv='الخادم',git='Git',jk='Jenkins',env='الخوادم',ftpn='بطيء · عرضة للأخطاء',m='رفع يدوي',p='دفع',tr='يطلق',dp='نشر آلي',r1='وقت نشر أقل',r2='أخطاء بشرية أقل')}[lg]
    d=Diagram(lg,T['h'])
    d.back.append('<path d="M60,300 H1220" stroke="#1e3a5f" stroke-width="2" stroke-dasharray="4 8"/>')
    d.back.append(txt(60,112,T['before'],15,'#f87171','start',800)); d.back.append(txt(60,338,T['after'],15,'#4ade80','start',800))
    # before: greyed, no animation of success
    d.edge('M226,190 L432,190',0,0,T['m'],330,172,color='#94a3b8',dot=False,op=.5)
    d.edge('M528,190 L732,190',0,0,None,color='#94a3b8',dot=False,op=.5)
    d.edge('M226,440 L432,440',0.0,2.4,T['p'],330,422)
    d.edge('M528,440 L732,440',2.4,4.8,T['tr'],630,422)
    d.edge('M828,440 L1034,440',4.8,7.2,T['dp'],931,422)
    d.edges.append('<g><circle cx="630" cy="190" r="17" fill="#450a0a" stroke="#f87171" stroke-width="2.5"/><path d="M622,182 L638,198 M638,182 L622,198" stroke="#f87171" stroke-width="3" stroke-linecap="round"/></g>')
    d.node(glyph('dev',180,190,84,'#64748b',.55),180,190,84,T['dev'],op=.55)
    d.node(glyph('folder',480,190,84,'#64748b',.55),480,190,84,T['ftp'],T['ftpn'],op=.55)
    d.node(glyph('server',780,190,84,'#64748b',.55),780,190,84,T['srv'],op=.55)
    d.node(glyph('dev',180,440,84,'#2563eb'),180,440,84,T['dev'])
    d.node(icon('git',480,440,92),480,440,92,T['git'],None,2.4)
    d.node(icon('jenkins',780,440,92),780,440,92,T['jk'],None,4.8)
    d.node(glyph('server',1080,440,84,'#16a34a'),1080,440,84,T['env'],None,7.2)
    for k,(y,msg) in enumerate([(165,T['r1']),(215,T['r2'])]):
        d.nodes.append(f'<rect x="960" y="{y-22}" width="250" height="40" rx="20" fill="#052e1a" stroke="#4ade80" stroke-opacity=".6"/>')
        d.nodes.append(f'<text x="1085" y="{y+5}" font-size="15" fill="#86efac" text-anchor="middle" font-weight="600">↓ {escape(msg)}</text>')
    return d.svg()
os.makedirs(OUT,exist_ok=True)
for slug,fn in (('jqcd',jqcd),('virtual-links',virtual),('devops-system',devops)):
    for lg in ('en','fr','ar'):
        open(os.path.join(OUT,f'{slug}-{lg}.svg'),'w',encoding='utf8').write(fn(lg))
print('ok')

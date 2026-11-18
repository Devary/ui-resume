#!/usr/bin/env python3
"""Generates the animated My Lab diagram (public/works/my-lab-<lang>.svg).
Icons: simple-icons paths in lab-icons.json (CC0). Host/IP are masked on purpose."""
import json, os
from xml.sax.saxutils import escape
HERE=os.path.dirname(os.path.abspath(__file__)); OUT=os.path.join(HERE,'..','public','works')
ICON=json.load(open(os.path.join(HERE,'lab-icons.json')))
L={
'en':dict(dev='Me + AI agents',github='GitHub + GitHub App',jenkins='Jenkins · CI/CD',sonar='SonarQube · quality',jfrog='JFrog · artifacts',docker='Docker · image',rundeck='Rundeck · deploy',
  verdaccio='Verdaccio · private npm',cluster='k3s cluster · Traefik ingress',ipa='FreeIPA · identity & DNS',fedora='Fedora server',mail='Mailcow · mail',
  push='push',scan='scan every 60 s',test='tests · coverage',pack='package · publish',img='build image',dep='deploy job',apply='kubectl apply',libs='libraries',
  ingress='ingress',secrets='secrets',events='events',sql='data',metrics='metrics',users='users · groups · DNS',smtp='SMTP · IMAP',font='Helvetica, Arial, sans-serif',dir='ltr',lang='en'),
'fr':dict(dev='Moi + agents IA',github='GitHub + GitHub App',jenkins='Jenkins · CI/CD',sonar='SonarQube · qualité',jfrog='JFrog · artefacts',docker='Docker · image',rundeck='Rundeck · déploiement',
  verdaccio='Verdaccio · npm privé',cluster='Cluster k3s · ingress Traefik',ipa='FreeIPA · identité & DNS',fedora='Serveur Fedora',mail='Mailcow · messagerie',
  push='push',scan='scan toutes les 60 s',test='tests · couverture',pack='package · publication',img='build image',dep='job de déploiement',apply='kubectl apply',libs='bibliothèques',
  ingress='ingress',secrets='secrets',events='événements',sql='données',metrics='métriques',users='utilisateurs · groupes · DNS',smtp='SMTP · IMAP',font='Helvetica, Arial, sans-serif',dir='ltr',lang='fr'),
'ar':dict(dev='أنا + وكلاء الذكاء الاصطناعي',github='GitHub + GitHub App',jenkins='Jenkins · CI/CD',sonar='SonarQube · الجودة',jfrog='JFrog · الحزم',docker='Docker · الصورة',rundeck='Rundeck · النشر',
  verdaccio='Verdaccio · npm خاص',cluster='عنقود k3s · مدخل Traefik',ipa='FreeIPA · الهوية وDNS',fedora='خادم Fedora',mail='Mailcow · البريد',
  push='دفع',scan='مسح كل 60 ثانية',test='اختبارات · تغطية',pack='تحزيم · نشر',img='بناء الصورة',dep='مهمة النشر',apply='kubectl apply',libs='المكتبات',
  ingress='مدخل',secrets='أسرار',events='أحداث',sql='بيانات',metrics='مقاييس',users='مستخدمون · مجموعات · DNS',smtp='SMTP · IMAP',font="'Segoe UI','Noto Sans Arabic',Tahoma,Arial,sans-serif",dir='rtl',lang='ar'),
}
CYCLE=15.0
def t(a): return round(a/CYCLE,4)
def icon(key,cx,cy,size,bg='#f1f5f9'):
    i=ICON[key]; s=size; pad=s*0.2; sc=(s-2*pad)/24
    col='#'+i['hex']
    return (f'<g><rect x="{cx-s/2}" y="{cy-s/2}" width="{s}" height="{s}" rx="{s*0.22}" fill="{bg}" filter="url(#sh)"/>'
            f'<g transform="translate({cx-s/2+pad},{cy-s/2+pad}) scale({sc})"><path d="{i["d"]}" fill="{col}"/></g></g>')
def glyph(kind,cx,cy,size,color):
    s=size; pad=s*0.22; sc=(s-2*pad)/24
    if kind=='ipa': g='<path d="M12 2l8 3v6c0 5-3.5 9.5-8 11-4.5-1.5-8-6-8-11V5z" fill="none" stroke="%s" stroke-width="2" stroke-linejoin="round"/><circle cx="12" cy="10" r="2.2" fill="%s"/><path d="M12 12v5" stroke="%s" stroke-width="2" stroke-linecap="round"/>'%(color,color,color)
    else: g='<rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="%s" stroke-width="2"/><path d="M3.5 6.5L12 13l8.5-6.5" fill="none" stroke="%s" stroke-width="2" stroke-linejoin="round"/>'%(color,color)
    return (f'<g><rect x="{cx-s/2}" y="{cy-s/2}" width="{s}" height="{s}" rx="{s*0.22}" fill="#f1f5f9" filter="url(#sh)"/>'
            f'<g transform="translate({cx-s/2+pad},{cy-s/2+pad}) scale({sc})">{g}</g></g>')
def label(x,y,txt,size=13,fill='#cbd5e1',anchor='middle',weight=500):
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{fill}" text-anchor="{anchor}" font-weight="{weight}">{escape(txt)}</text>'
def build(lg):
    T=L[lg]; defs=[]; body=[]; pid=[0]
    def path(d,start,end,lab=None,lx=None,ly=None,dot=True,color='#38bdf8',w=2.4):
        pid[0]+=1; i=pid[0]
        defs.append(f'<path id="p{i}" d="{d}"/>')
        body.append(f'<use href="#p{i}" fill="none" stroke="#334155" stroke-width="{w+2}" stroke-linecap="round"/>')
        body.append(f'<use href="#p{i}" fill="none" stroke="{color}" stroke-opacity=".75" stroke-width="{w}" stroke-linecap="round" stroke-dasharray="7 7" marker-end="url(#ah)"><animate attributeName="stroke-dashoffset" from="28" to="0" dur="1.4s" repeatCount="indefinite"/></use>')
        if dot:
            a,b=t(start),t(end); e=min(0.012,(b-a)/4)
            body.append(f'<circle r="5.5" fill="#fff" stroke="{color}" stroke-width="2.5" opacity="0"><animateMotion dur="{CYCLE}s" repeatCount="indefinite" calcMode="linear" keyPoints="0;0;1;1" keyTimes="0;{a};{b};1"><mpath href="#p{i}"/></animateMotion>'
                        f'<animate attributeName="opacity" dur="{CYCLE}s" repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;{a};{round(a+e,4)};{round(b-e,4)};{b};1"/></circle>')
        if lab: body.append(label(lx,ly,lab,12,'#93c5fd'))
        return i
    def ring(cx,cy,w,h,arrive,rx=22):
        a=t(arrive); 
        body.append(f'<rect x="{cx-w/2-5}" y="{cy-h/2-5}" width="{w+10}" height="{h+10}" rx="{rx+4}" fill="none" stroke="#38bdf8" stroke-width="3" opacity="0"><animate attributeName="opacity" dur="{CYCLE}s" repeatCount="indefinite" values="0;0;1;0;0" keyTimes="0;{round(a-0.004,4)};{a};{round(a+0.07,4)};1"/></rect>')
    # nodes (rings first so tiles draw above)
    N=dict(dev=(110,300,84),github=(280,300,84),jenkins=(480,300,96),sonar=(690,118,84),jfrog=(690,300,84),docker=(690,466,84),rundeck=(860,300,84),verdaccio=(480,470,84))
    arr=dict(github=1.5,jenkins=3.0,sonar=4.8,jfrog=6.0,docker=7.2,rundeck=8.8,verdaccio=4.8)
    for k,(x,y,s) in N.items():
        if k in arr: ring(x,y,s,s,arr[k])
    # edges
    path('M154,300 L236,300',0,1.5,T['push'],195,284)
    path('M324,300 L430,300',1.5,3.0,T['scan'],377,284)
    path('M530,280 C595,280 595,118 646,118',3.0,4.8,None)
    body.append(label(572,150,T['test'],12,'#93c5fd','end'))
    path('M690,198 L690,254',4.8,6.0,None)
    body.append(label(704,232,T['pack'],12,'#93c5fd','start'))
    path('M690,380 L690,420',6.0,7.2,None)
    body.append(label(704,404,T['img'],12,'#93c5fd','start'))
    path('M734,466 C792,466 792,312 816,306',7.2,8.8,T['dep'],812,420)
    path('M904,300 L976,300',8.8,10.3,T['apply'],940,284)
    path('M480,350 L480,426',3.0,4.8,None)
    body.append(label(494,392,T['libs'],12,'#93c5fd','start'))
    # cluster
    body.append('<rect x="976" y="66" width="276" height="436" rx="22" fill="#0b1b33" stroke="#38bdf8" stroke-opacity=".5" stroke-width="2" stroke-dasharray="3 5"/>')
    ring(1114,284,276,436,10.3,rx=22)
    body.append(icon('k3s',1008,104,40))
    body.append(label(1034,110,T['cluster'],13,'#e2e8f0','start',700))
    C=[('traefikproxy',1025,190,'Traefik'),('quarkus',1115,190,'Quarkus'),('angular',1205,190,'Angular'),
       ('vault',1025,300,'Vault'),('apachekafka',1115,300,'Kafka'),('postgresql',1205,300,'PostgreSQL'),
       ('prometheus',1025,410,'Prometheus'),('grafana',1115,410,'Grafana'),('harbor',1205,410,'Harbor')]
    for k,x,y,n in C:
        bg='#111827' if k=='vault' else '#f1f5f9'
        body.append(icon(k,x,y,60,bg)); body.append(label(x,y+46,n,11,'#cbd5e1'))
    ci='#a7f3d0'
    path('M1056,190 L1084,190',10.3,12.6,None,dot=True,color=ci,w=2)
    path('M1050,270 L1098,220',10.3,12.6,None,dot=True,color=ci,w=2)
    path('M1115,222 L1115,268',10.5,12.8,None,dot=True,color=ci,w=2)
    path('M1142,216 L1184,272',10.7,13.0,None,dot=True,color=ci,w=2)
    path('M1056,410 L1084,410',10.9,13.2,None,dot=True,color=ci,w=2)
    for tx,ty,s in [(1115,254,T['events']),(1070,400,T['metrics'])]:
        body.append(label(tx,ty,s,9.5,'#6ee7b7'))
    # nodes
    for k,(x,y,s) in N.items():
        if k=='dev': body.append(icon('claude',x,y,s))
        elif k=='github': body.append(icon('github',x,y,s))
        elif k=='jenkins': body.append(icon('jenkins',x,y,s))
        elif k=='sonar': body.append(icon('sonarqube',x,y,s))
        elif k=='jfrog': body.append(icon('jfrog',x,y,s))
        elif k=='docker': body.append(icon('docker',x,y,s))
        elif k=='rundeck': body.append(icon('rundeck',x,y,s))
        elif k=='verdaccio': body.append(icon('verdaccio',x,y,s))
        body.append(label(x,y+s/2+22,T[k if k!='sonar' else 'sonar'],13,'#e2e8f0'))
    # bottom strip
    body.append('<rect x="40" y="540" width="1200" height="160" rx="20" fill="#0d1a30" stroke="#1e3a5f" stroke-width="1.5"/>')
    body.append(glyph('ipa',110,610,76,'#2563eb')); body.append(label(110,668,T['ipa'],13,'#e2e8f0'))
    body.append(icon('fedora',640,610,76)); body.append(label(640,668,T['fedora'],13,'#e2e8f0'))
    body.append(glyph('mail',1170,610,76,'#d97706')); body.append(label(1170,668,T['mail'],13,'#e2e8f0'))
    path('M156,610 L592,610',0.0,0.0,T['users'],374,594,dot=False,color='#a78bfa',w=2.2)
    path('M688,610 L1124,610',0.0,0.0,T['smtp'],906,594,dot=False,color='#fbbf24',w=2.2)
    head=(f'<text x="60" y="52" font-size="17" fill="#e2e8f0" font-weight="700">My Lab</text>'
          f'<text x="126" y="52" font-size="14" fill="#94a3b8">{T["fedora"]} · i•a · 192.•••.•••.41</text>')
    svg=(f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1280 740" width="1280" height="740" xml:lang="{T["lang"]}" font-family="{T["font"]}" direction="ltr">'
         f'<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a1020"/><stop offset="1" stop-color="#12203a"/></linearGradient>'
         f'<filter id="sh" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000" flood-opacity=".45"/></filter>'
         f'<marker id="ah" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M1,1 L8,4.5 L1,8 z" fill="#38bdf8"/></marker>{"".join(defs)}</defs>'
         f'<rect width="1280" height="740" rx="26" fill="url(#bg)"/><rect x="20" y="20" width="1240" height="700" rx="22" fill="none" stroke="#1e3a5f" stroke-width="1.5"/>'
         + head + ''.join(body) + '</svg>')
    open(os.path.join(OUT,f'my-lab-{lg}.svg'),'w',encoding='utf8').write(svg); print(lg,len(svg)//1024,'KB')
os.makedirs(OUT,exist_ok=True)
for lg in L: build(lg)

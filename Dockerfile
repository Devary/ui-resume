FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN mkdir -p /usr/share/nginx/html/ui-resume
COPY dist/ui-resume/browser/ /usr/share/nginx/html/ui-resume/

EXPOSE 8080

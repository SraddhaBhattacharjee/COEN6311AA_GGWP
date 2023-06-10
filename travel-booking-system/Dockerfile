FROM openjdk:17-alpine
WORKDIR  /opt
ENV PORT 8089
EXPOSE 8089
COPY target/*.jar /opt/app.jar
ENTRYPOINT exec java $JAVA_OPTS -jar app.jar
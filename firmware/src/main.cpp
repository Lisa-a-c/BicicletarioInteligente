/*
 * BicicletÃ¡rio Inteligente â Firmware ESP32
 * PlatformIO | Framework: Arduino
 *
 * Endpoints:
 *   GET  /ping     â { "device": "bicicletario" }
 *   GET  /status   â { "detected": bool, "distancia": float }
 *   POST /monitor  â body: { "monitoring": true|false }
 *
 * Pinos:
 *   HC-SR04 TRIG â GPIO 25
 *   HC-SR04 ECHO â GPIO 34
 *   LED Vermelho â GPIO 27
 *   LED Verde    â GPIO 26
 */

#include <Arduino.h>
#include <WiFi.h>
#include <WebServer.h>

//CONFIGURAÃÃES 
const char* SSID     = "Desktop_F4027447"; //Desktop_F4027447 ou iPhone de Enzo
const char* PASSWORD = "5078652003995932"; //5078652003995932 ou 11092007

const int TRIG_PIN = 25;
const int ECHO_PIN = 34;
const int LED_RED  = 27;
const int LED_GRN  = 26;

const float DISTANCIA_LIMITE_CM = 4.0;

WebServer server(80);

bool monitorando   = false;
bool bikeDetectada = false;

//DISTANCIA

float medirDistancia() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  long duracao = pulseIn(ECHO_PIN, HIGH, 30000);
  if (duracao == 0) return 999.0;

  return duracao / 58.0;
}

//LED

void atualizarLED() {
  if (!monitorando) {
    digitalWrite(LED_RED, LOW);
    digitalWrite(LED_GRN, HIGH); // Verde â aguardando
  } else if (bikeDetectada) {
    digitalWrite(LED_RED, LOW);
    digitalWrite(LED_GRN, HIGH); // Verde â bike presente
  } else {
    digitalWrite(LED_RED, HIGH);
    digitalWrite(LED_GRN, LOW);  // Vermelho â alerta
  }
}

//conexÃ£o com o servidor

void handlePing() {
  server.send(200, "application/json", "{\"device\":\"bicicletario\"}");
}

//construÃ§Ã£o do JSON de informaÃ§Ã£o de ocupaÃ§Ã£o, recebe a requisiÃ§Ã£o da presenÃ§a de bicicleta '/status'

void handleStatus() {
  float dist    = medirDistancia();
  bikeDetectada = (dist < DISTANCIA_LIMITE_CM);
  atualizarLED();

  Serial.print("Distancia: ");
  Serial.print(dist);
  Serial.print(" cm | Detectada: ");
  Serial.println(bikeDetectada ? "SIM" : "NAO");

  String json = String("{\"detected\":") +
                (bikeDetectada ? "true" : "false") +
                ",\"distancia\":" + String(dist, 1) + "}";

  server.send(200, "application/json", json);
}

//recebe informaÃ§Ã£o da mudanÃ§a de status do botÃ£o para acender o led, esp manda um post avisando q ligou o botÃ£o

void handleMonitor() {
  if (server.method() == HTTP_POST) {
    String body = server.arg("plain");
    monitorando  = (body.indexOf("true") != -1);
    Serial.println(monitorando ? ">> Monitoramento INICIADO" : ">> Monitoramento PARADO");
    atualizarLED();
  }
  //fecha a comunicaÃ§Ã£o
  server.send(200, "application/json", "{\"ok\":true}");
}

//ExecuÃ§Ã£o

void setup() {
  Serial.begin(115200);

  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(LED_RED,  OUTPUT);
  pinMode(LED_GRN,  OUTPUT);

  digitalWrite(LED_RED, LOW);
  digitalWrite(LED_GRN, LOW);

  Serial.print("Conectando ao Wi-Fi");
  WiFi.begin(SSID, PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nConectado!");
  Serial.print("IP do ESP32: ");
  Serial.println(WiFi.localIP());

  server.on("/ping",    HTTP_GET,  handlePing);
  //chama a cada 1 segundo com monitoring ativo, fica pergutnando o tempo todo pro esp se o sensor ve algo
  server.on("/status",  HTTP_GET,  handleStatus);
  server.on("/monitor", HTTP_POST, handleMonitor);
  server.begin();

  Serial.println("Servidor HTTP iniciado.");
  atualizarLED();
}

void loop() {
  server.handleClient();
}

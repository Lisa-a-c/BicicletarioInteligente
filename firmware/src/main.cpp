/*
 * Bicicletário Inteligente — Firmware ESP32
 * PlatformIO | Framework: Arduino
 *
 * Endpoints:
 *   GET  /ping     → { "device": "bicicletario" }
 *   GET  /status   → { "detected": bool, "distancia": float }
 *   POST /monitor  → body: { "monitoring": true|false }
 *
 * Pinos:
 *   HC-SR04 TRIG → GPIO 25
 *   HC-SR04 ECHO → GPIO 34
 *   LED Vermelho → GPIO 27
 *   LED Verde    → GPIO 26
 */

#include <Arduino.h>
#include <WiFi.h>
#include <WebServer.h>

//CONFIGURAÇÕES 
const char* SSID     = "YOUR_SSID";
const char* PASSWORD = "YOUR_PASSWORD";

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
    digitalWrite(LED_GRN, HIGH); // Verde — aguardando
  } else if (bikeDetectada) {
    digitalWrite(LED_RED, LOW);
    digitalWrite(LED_GRN, HIGH); // Verde — bike presente
  } else {
    digitalWrite(LED_RED, HIGH);
    digitalWrite(LED_GRN, LOW);  // Vermelho — alerta
  }
}

//conexão com o servidor

void handlePing() {
  server.send(200, "application/json", "{\"device\":\"bicicletario\"}");
}

//construção do JSON de informação de ocupação, recebe a requisição da presença de bicicleta '/status'

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

//recebe informação da mudança de status do botão para acender o led, esp manda um post avisando q ligou o botão

void handleMonitor() {
  if (server.method() == HTTP_POST) {
    String body = server.arg("plain");
    monitorando  = (body.indexOf("true") != -1);
    Serial.println(monitorando ? ">> Monitoramento INICIADO" : ">> Monitoramento PARADO");
    atualizarLED();
  }
  //fecha a comunicação
  server.send(200, "application/json", "{\"ok\":true}");
}

//Execução

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

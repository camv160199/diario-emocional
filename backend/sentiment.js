const Sentiment = require('sentiment');
const sentiment = new Sentiment();

// Diccionario emocional en español (positivo y negativo)
const diccionario = {

  // ====== POSITIVAS ======
  "feliz": 3, "alegre": 2, "contento": 2, "encantado": 3, "excitado": 3, "motivado": 2,
  "animado": 2, "optimista": 2, "positivo": 2, "maravilloso": 3, "genial": 3, "excelente": 4,
  "grandioso": 3, "perfecto": 3, "bien": 1, "amor": 3, "amado": 3, "agradecido": 3,
  "satisfecho": 2, "tranquilo": 2, "relajado": 2, "esperanzado": 2, "logrado": 2,
  "triunfante": 3, "orgulloso": 2, "increíble": 4, "fantástico": 4, "magnífico": 4,
  "asombroso": 4, "fabuloso": 4, "brillante": 3, "radiante": 3, "positivo": 2,
  "entusiasmado": 3, "soñador": 2, "pleno": 2, "agradecimiento": 3,

  // Frases positivas comunes
  "me siento bien": 2,
  "muy bien": 2,
  "todo va bien": 2,
  "hoy fue un buen día": 3,
  "me siento mejor": 2,

  // ====== NEGATIVAS ======
  "triste": -3, "deprimido": -4, "solo": -2, "abandonado": -3, "frustrado": -2,
  "cansado": -1, "agotado": -2, "estresado": -2, "ansioso": -2, "preocupado": -2,
  "enojado": -3, "molesto": -2, "furioso": -4, "infeliz": -3, "miserable": -4,
  "derrotado": -3, "fracaso": -3, "fatal": -3, "horrible": -4, "terrible": -4,
  "desesperado": -4, "angustiado": -3, "dolido": -2, "temeroso": -2,
  "disgustado": -2, "negativo": -2, "estres": -1, "estresado": -2, "agotado": -2,
  "abrumado": -2, "confundido": -1, "inseguro": -2, "pesimista": -2,

  "mal": -2, "muy mal": -3, "repugnante": -4, "asco": -3, "no puedo más": -4,
  "odio": -3, "me siento mal": -3, "hoy fue un mal día": -3,

  // ====== SUAVES NEGATIVAS ======
  "aburrido": -1, "indiferente": -1, "lejos": -1, "apagado": -1, "vacío": -2,

  // ====== EXPRESIONES QUE SUELE USAR LA GENTE ======
  "no tengo ganas": -2,
  "sin energía": -2,
  "me siento triste": -3,
  "me siento solo": -3,
  "me siento cansado": -2,
  "me siento inútil": -4,
  "me siento mal": -3,
  "me siento horrible": -4,
  "me siento feliz": 3,
  "me siento motivado": 3,
  "me siento orgulloso": 3,
  "todo salió bien": 3,
  "nada salió bien": -3,

  // ====== PALABRAS NEUTRAS QUE A VECES AYUDAN ======
  "normal": 0, "ok": 0, "regular": 0

};

function analizarTexto(texto) {
  const resultado = sentiment.analyze(texto.toLowerCase(), { extras: diccionario });

  let label = "neutral";
  if (resultado.score > 0) label = "positiva";
  if (resultado.score < 0) label = "negativa";

  return {
    label,
    score: resultado.score
  };
}

module.exports = analizarTexto;

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HealthcareService {
  // Healthcare AI knowledge base
  private healthKnowledgeBase: {[key: string]: string} = {
    // Common health conditions
    "headache": "Headaches can be caused by stress, dehydration, lack of sleep, or more serious conditions. For occasional headaches, try rest, hydration, and over-the-counter pain relievers. If headaches are severe, persistent, or accompanied by other symptoms like fever or vision changes, consult a healthcare provider.",
    "migraine": "Migraines are severe headaches often accompanied by nausea, sensitivity to light and sound, and visual disturbances. Triggers include stress, certain foods, hormonal changes, and environmental factors. Treatment options include pain relievers, preventive medications, and lifestyle changes. For recurring migraines, consult a healthcare provider.",
    "fever": "Fever is your body's natural response to infection. A temperature above 38°C (100.4°F) is considered a fever for adults. Rest, stay hydrated, and take acetaminophen or ibuprofen if needed. Seek medical attention if the fever exceeds 39.4°C (103°F), lasts more than 3 days, or is accompanied by severe symptoms.",
    "cold": "The common cold is a viral infection of your nose and throat. Symptoms include a runny nose, congestion, sore throat, and cough. Treatment focuses on relieving symptoms with rest, hydration, and over-the-counter medications. Most colds resolve within 7-10 days.",
    "flu": "Influenza (flu) is a viral infection that affects your respiratory system. Symptoms include fever, body aches, fatigue, and respiratory issues. Rest, fluids, and over-the-counter medications help manage symptoms. Antiviral medications may be prescribed if diagnosed early. Seek medical attention if symptoms are severe.",
    "cough": "Coughing is your body's way of clearing irritants from your airways. For dry coughs, try throat lozenges or honey in warm water. For productive coughs, staying hydrated helps. If the cough persists for more than 3 weeks, is severe, or is accompanied by shortness of breath or blood, consult a healthcare provider.",
    "sore throat": "Sore throats are often caused by viral infections but can also be bacterial (like strep throat). Gargle with warm salt water, drink warm liquids, or use throat lozenges for relief. If severe, accompanied by fever, or lasting more than a week, consult a healthcare provider.",
    "stomach pain": "Stomach pain can have many causes, from gas and indigestion to more serious conditions. Try resting, avoiding triggering foods, and taking antacids for mild discomfort. If pain is severe, persistent, or accompanied by vomiting or fever, seek medical attention.",
    "diarrhea": "Diarrhea is often caused by viruses, bacteria, or food intolerances. Stay hydrated with water and electrolyte solutions. Avoid dairy, fatty, and high-fiber foods temporarily. If severe, contains blood, or lasts more than 2 days, consult a healthcare provider.",
    "constipation": "Constipation can be relieved by increasing fiber intake, staying hydrated, and regular physical activity. Over-the-counter fiber supplements or stool softeners may help. If persistent or accompanied by severe pain or bleeding, consult a healthcare provider.",
    "rash": "Rashes can be caused by allergies, infections, or skin conditions. For mild rashes, avoid irritants and try over-the-counter hydrocortisone cream. If a rash is widespread, painful, accompanied by fever, or doesn't improve, consult a healthcare provider.",
    "allergies": "Allergies occur when your immune system reacts to a foreign substance. Symptoms may include sneezing, itching, or rashes. Avoiding triggers and taking antihistamines can help manage symptoms. For severe allergic reactions, seek immediate medical attention.",
    "asthma": "Asthma is a condition in which your airways narrow and swell, producing extra mucus. This can make breathing difficult and trigger coughing, wheezing, and shortness of breath. Follow your asthma action plan and use prescribed inhalers. Seek immediate help if experiencing severe breathing difficulties.",

    // Blood pressure related
    "blood pressure": "Normal blood pressure is below 120/80 mmHg. High blood pressure (hypertension) is 130/80 mmHg or higher. To maintain healthy blood pressure: exercise regularly, eat a balanced diet low in sodium, limit alcohol, maintain a healthy weight, and manage stress.",
    "hypertension": "Hypertension (high blood pressure) is a common condition where blood pressure against artery walls is consistently too high. It often has no symptoms but can lead to serious health problems. Management includes lifestyle changes and sometimes medications. Regular monitoring is important.",
    "hypotension": "Hypotension (low blood pressure) is when readings are below 90/60 mmHg. Symptoms may include dizziness, fainting, and fatigue. Stay hydrated, eat small, frequent meals, and avoid standing up too quickly. If symptoms are severe or persistent, consult a healthcare provider.",

    // Diabetes related
    "diabetes": "Diabetes is a chronic condition affecting how your body processes blood sugar. Type 1 requires insulin, while Type 2 can often be managed with lifestyle changes and/or medication. Symptoms include increased thirst, frequent urination, hunger, and fatigue. Regular monitoring and management is essential.",
    "glucose": "Normal fasting blood glucose is between 70-99 mg/dL. For people with diabetes, target ranges vary but are typically 80-130 mg/dL before meals. Regular monitoring helps manage diabetes effectively. Extreme high or low levels require medical attention.",
    "insulin": "Insulin is a hormone that regulates blood sugar. People with Type 1 diabetes and some with Type 2 require insulin therapy. There are different types (rapid-acting, long-acting) and delivery methods (injections, pumps). Follow your healthcare provider's instructions for proper use.",

    // Heart health
    "heart disease": "Heart disease encompasses various conditions affecting heart function. Prevention includes regular exercise, healthy diet, not smoking, and managing conditions like high blood pressure. Early symptoms may include chest pain, shortness of breath, and fatigue. Regular check-ups are important.",
    "cholesterol": "Healthy cholesterol levels include: Total cholesterol below 200 mg/dL, LDL ('bad') below 100 mg/dL, and HDL ('good') above 60 mg/dL. Diet, exercise, and sometimes medication can help manage levels. Regular testing is recommended for adults.",
    "heart attack": "Heart attack symptoms include chest pain/pressure, pain radiating to arm/jaw, shortness of breath, cold sweat, and nausea. This is a medical emergency - call emergency services immediately if you suspect a heart attack.",
    "arrhythmia": "Arrhythmias are irregular heartbeats – too fast, too slow, or irregular rhythm. Many are harmless, but some can be serious. Symptoms may include palpitations, dizziness, or shortness of breath. If you experience symptoms, consult a healthcare provider.",

    // General wellness
    "exercise": "Adults should aim for at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity weekly, plus muscle-strengthening activities twice weekly. Start slowly if you're new to exercise, and choose activities you enjoy to help maintain consistency.",
    "diet": "A balanced diet includes vegetables, fruits, whole grains, lean proteins, and healthy fats. Limit processed foods, added sugars, and excessive sodium. Portion control is also important. Consider consulting a dietitian for personalized advice.",
    "sleep": "Adults need 7-9 hours of quality sleep per night. Good sleep hygiene includes: consistent sleep schedule, comfortable bedroom environment, limiting screen time before bed, and avoiding caffeine/alcohol close to bedtime. Persistent sleep problems should be discussed with a healthcare provider.",
    "stress": "Chronic stress can impact physical and mental health. Management techniques include regular exercise, adequate sleep, deep breathing, meditation, maintaining social connections, and limiting stressors when possible. For persistent stress or anxiety, consider speaking with a mental health professional.",
    "vitamin": "Vitamins and minerals are essential for many body functions. Most people get sufficient nutrients from a balanced diet. Supplements may be recommended for specific deficiencies or conditions. Consult a healthcare provider before starting supplements, as excess amounts can be harmful.",
    "weight": "Healthy weight management involves balanced nutrition, regular physical activity, and behavior changes. Crash diets often don't work long-term. Aim for gradual, sustainable changes. BMI and waist circumference can help assess health risks, but have limitations. Consult healthcare providers for personalized advice.",
    "smoking": "Quitting smoking is one of the best things you can do for your health. Benefits begin within hours and continue for years. Strategies include nicotine replacement therapy, prescription medications, and behavioral support. It often takes multiple attempts, so don't get discouraged.",
    "alcohol": "Moderate alcohol consumption means up to 1 drink daily for women and up to 2 for men. Excessive drinking increases risks of health problems. If you're concerned about your drinking habits, speak with a healthcare provider about strategies and support for cutting back."
  };

  constructor() { }

  generateResponse(userMessage: string): string {
    const message = userMessage.toLowerCase();

    // Check for greetings
    if (message.match(/hello|hi|hey|greetings|hola|bonjour|kohomada|sup/i)) {
      return "Hello! How can I help with your health questions today?";
    }

    // Check for thanks
    if (message.match(/thank you|thanks|thx|ty|isthuthiyi/i)) {
      return "You're welcome! Is there anything else I can help you with?";
    }

    // Check for specific health conditions in knowledge base
    for (const [key, value] of Object.entries(this.healthKnowledgeBase)) {
      if (message.includes(key)) {
        return value;
      }
    }

    // Check for symptom questions
    if (message.match(/symptom|feeling|experiencing|leda|ledawelaa|ledakt hiyanawaa/i)) {
      if (message.match(/headache|head pain|migraine|oluwa ridenawaa/i)) {
        return this.healthKnowledgeBase['headache'];
      }
      if (message.match(/fever|temperature|hot|una wage/i)) {
        return this.healthKnowledgeBase['fever'];
      }
      if (message.match(/cough|coughing|kassa|kassa thadatama/i)) {
        return this.healthKnowledgeBase['cough'];
      }
      if (message.match(/throat|swallow/i) && message.match(/pain|sore|hurt/i)) {
        return this.healthKnowledgeBase['sore throat'];
      }
      if (message.match(/stomach|belly|abdomen/i) && message.match(/pain|ache|hurt/i)) {
        return this.healthKnowledgeBase['stomach pain'];
      }
      if (message.match(/diarrhea|loose stool|watery stool/i)) {
        return this.healthKnowledgeBase['diarrhea'];
      }
      if (message.match(/constipation|constipated|can't poop/i)) {
        return this.healthKnowledgeBase['constipation'];
      }
      if (message.match(/rash|skin|itchy/i)) {
        return this.healthKnowledgeBase['rash'];
      }

      // Generic symptom response
      return "I notice you're mentioning symptoms. Could you provide more details about what you're experiencing? Or you can ask about specific conditions like headaches, fever, cough, allergies, etc.";
    }

    // Check for medication questions
    if (message.match(/medicine|medication|drug|pill|tablet/i)) {
      return "I can provide general information about common medications, but for specific medication advice, dosage information, or potential interactions, please consult with a healthcare provider or pharmacist who knows your medical history.";
    }

    // Check for emergency situations
    if (message.match(/emergency|ambulance|911|urgent|severe pain|can't breathe/i)) {
      return "If you're experiencing a medical emergency such as severe chest pain, difficulty breathing, severe bleeding, or signs of stroke, please call emergency services (911) immediately. Don't wait for online advice in emergency situations.";
    }

    // General health response if nothing specific is found
    return "I understand you have a health question. I can provide information about common conditions like colds, headaches, allergies, heart health, diabetes, and general wellness topics. Could you please provide more specific details about what you'd like to know?";
  }
}
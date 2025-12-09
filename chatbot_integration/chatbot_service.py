import os
HF_API_KEY = "hf_dummy_key"

def get_chatbot_response(message, history, products):
    product_names = [p.get("name", "").lower() for p in products]
    msg_lower = message.lower()
    found = [name for name in product_names if name in msg_lower]
    
    if found:
        return f"Šeit ir informācija par {found[0]} produktu."
    else:
        return "Atvainojiet, es varu palīdzēt tikai ar informāciju par šo veikalu."


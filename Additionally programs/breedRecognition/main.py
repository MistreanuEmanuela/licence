import sys
import numpy as np
from tensorflow.keras.applications.inception_v3 import InceptionV3, preprocess_input, decode_predictions
from tensorflow.keras.preprocessing import image
model = InceptionV3(weights='imagenet')

def predict_breed(img):
    x = np.expand_dims(img, axis=0)
    x = preprocess_input(x)

    preds = model.predict(x)
    predictions = decode_predictions(preds, top=5)[0]
    return '\n'.join([f'{label}: {prob:.2%},' for (_, label, prob) in predictions])

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python main.py <image_path>")
        sys.exit(1)

    image_path = sys.argv[1]
    img = image.load_img(image_path, target_size=(299, 299))
    img_array = image.img_to_array(img)

    # Perform breed prediction
    predictions = predict_breed(img_array)
    print('Predicted:', predictions)
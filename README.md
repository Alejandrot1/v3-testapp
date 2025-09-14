# FastAPI + Vite + React SPA

## Build and Push to Artifact Registry

1. Build the Docker image:
      docker build -t <your-image-name> .
   
2. Push the image to Artifact Registry:
      docker push <your-image-name>
   
## Deploy to Cloud Run

1. Deploy the service:
      gcloud run deploy <your-service-name> --image <your-image-name> --platform managed --region <your-region>
   
## Frontend Setup

1. Navigate to the frontend directory:
      cd frontend
   
2. Install dependencies:
      npm install
   
3. Start the development server:
      npm run dev
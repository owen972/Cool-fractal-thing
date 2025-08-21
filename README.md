# Cool-fractal-thing

This repository hosts a small static HTML page (`coolstuff.html`) and a minimal Node.js server so it can be deployed to Google Cloud Run using Cloud Build for continuous deployment.

What I added:

- `server.js` — Express server that serves `coolstuff.html` and listens on $PORT.
- `package.json` — Node metadata and start script.
- `Dockerfile` — Builds a container image for Cloud Run.
- `.dockerignore` — Files to exclude from the image.
- `cloudbuild.yaml` — Cloud Build pipeline: builds, pushes, and deploys to Cloud Run.

Quick local test

1. Install dependencies:

```bash
npm install
```

2. Run locally:

```bash
npm start
```

3. In another terminal, test with curl (server listens on 8080 by default):

```bash
curl http://localhost:8080/
```

Cloud Run continuous deployment notes

1. Create an Artifact Registry Docker repository (example uses `us-central1`):

	- gcloud artifacts repositories create my-repo --repository-format=docker --location=us-central1

2. Update `cloudbuild.yaml` substitutions to set `_REGION` and `_REPOSITORY` to your values.

3. Enable required APIs and grant Cloud Build permissions:

```bash
gcloud services enable cloudbuild.googleapis.com run.googleapis.com artifactregistry.googleapis.com
gcloud projects add-iam-policy-binding $PROJECT_ID --member=serviceAccount:$PROJECT_NUMBER@cloudbuild.gserviceaccount.com --role=roles/run.admin
gcloud projects add-iam-policy-binding $PROJECT_ID --member=serviceAccount:$PROJECT_NUMBER@cloudbuild.gserviceaccount.com --role=roles/artifactregistry.writer
```

4. Connect your repository to Cloud Build triggers in the Google Cloud Console and point the trigger to `cloudbuild.yaml`. On each push, Cloud Build will build the image, push to Artifact Registry, and deploy to Cloud Run.

If you want I can also create a Cloud Build trigger YAML for you or a GitHub Action variant.
# Gunakan image Python
FROM python:3.12

# Set working directory ke dalam container
WORKDIR /app

# Copy semua file backend ke dalam container
COPY . /app

# Install dependencies
RUN pip install --no-cache-dir -r /app/requirements.txt

# Jalankan aplikasi dengan Uvicorn
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]

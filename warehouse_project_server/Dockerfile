# Use an official Python runtime as a parent image
FROM python:3.8

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN pip install gunicorn

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Define the command to run on startup
CMD ["gunicorn", "warehouse_project_server.wsgi:application", "--bind", "0.0.0.0:8000"]

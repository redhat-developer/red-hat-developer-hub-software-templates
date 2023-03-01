FROM registry.access.redhat.com/ubi9/python-39:latest

# By default, listen on port 5000
EXPOSE 5000/tcp
ENV FLASK_PORT=5000

# Set the working directory in the container
WORKDIR /projects

# Copy the dependencies file to the working directory
COPY requirements.txt .

# Install any dependencies
RUN pip install -r requirements.txt

# Copy the content of the local src directory to the working directory
COPY . .

# Specify the command to run on container start
CMD [ "python", "./app.py" ]

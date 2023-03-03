FROM registry.access.redhat.com/ubi9/python-39:latest

# Set the working directory in the container
WORKDIR /projects

# Copy the dependencies file to the working directory
COPY requirements.txt .

# Install any dependencies
RUN pip install -r requirements.txt

# Copy the content of the local src directory to the working directory
COPY . .

ENV PORT ${{ values.port }}
EXPOSE ${{ values.port }}

# Specify the command to run on container start
CMD [ "python", "./src/app.py" ]

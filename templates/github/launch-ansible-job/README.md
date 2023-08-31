# Launch an Ansible Automation Platform Job
This template requires a secret to be defined that provides the URL for Ansible Automation Platform as well as a token to interact with Ansible Automation Platform.

* Generate a Write token within AAP https://docs.ansible.com/automation-controller/4.1.0/html/userguide/applications_auth.html#add-tokens
* Manually create a Kubernetes Secret or create a secret using a secure secret solution such as Vault

Provide the value of token and host as it relates to your environment.
```
kubectl create secret generic aapaccess -n aap --from-literal=token=$TOKEN --from-literal=host=$AAP_URL
```

Once this secret has been generated on the cluster it is now possible to use the Ansible Job template.
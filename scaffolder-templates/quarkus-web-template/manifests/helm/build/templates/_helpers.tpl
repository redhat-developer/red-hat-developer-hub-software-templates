{{/*
Image Url image will be pushed to defaults to internal registry
*/}}
{{- define "image.dev-url" -}}
{{- with .Values.image }}
{{- if eq .registry "Quay" }}
{{- printf "%s/%s/%s" .host .organization .name }}
{{- else }}
{{- printf "%s/%s-dev/%s" .host .name .name }}
{{- end }}
{{- end }}
{{- end }}

{{- define "image.preprod-url" -}}
{{- with .Values.image }}
{{- printf "%s/%s-preprod/%s" .host .name .name }}
{{- end }}
{{- end }}
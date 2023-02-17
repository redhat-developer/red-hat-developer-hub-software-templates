{{/*
Image Url image will be pushed to defaults to internal registry
*/}}
{{- define "image.url" -}}
{{- with .Values.image }}
{{- printf "%s/%s:%s" .host .name .tag }}
{{- end }}
{{- end }}